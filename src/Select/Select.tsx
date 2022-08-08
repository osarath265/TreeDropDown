import React, { useEffect, useState, useRef, ChangeEvent } from "react";

import "./Select.css";

interface data {
  val: Array<object>;
  parent: object;
}

type Data = {
  id: string;
  value: string;
  title: string;
  child: Data[];
};

export const Select = (props: any) => {
  const [options, setOptions]: [data, Function] = useState({
    val: props.data,
    parent: {},
  });

  const [menuFlag, toggleMenu] = useState(true);
  const [selected, changeSelection] = useState({ option: "" });

  const Menu = useRef<any>(null);

  const closeOpenMenus = (e: Event) => {
    if (Menu.current && menuFlag && !Menu.current.contains(e.target)) {
      toggleMenu(true);
    }
  };

  function search(
    key: string,
    menuData: Array<object>,
    searchResult: Array<object>
  ) {
    menuData.map((val: any) => {
      Object.keys(val).map((k) => {
        if (Array.isArray(val[k])) {
          search(key, val[k], searchResult);
        } else {
          if (
            k == "key" &&
            val[k].toLowerCase().includes(key) &&
            val.child.length == 0
          ) {
            searchResult.push(val);
          }
        }
      });
    });
  }

  function getSearchResults(e: ChangeEvent) {
    let searchOutput: Array<object>;
    let searchParam = (e.target as HTMLInputElement).value;
    if (searchParam === "") {
      setOptions({ val: props.data, parent: null });
    } 
    else {
      let result: Array<object> = [];
      search(searchParam.toLowerCase(), props.data, result);
      if (result && result.length == 0) {
        setOptions({ val: props.data, parent: null });
      } 
      
      else setOptions({ val: result, parent: null });
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", closeOpenMenus);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", closeOpenMenus);
    };
  }, []);

  return (
    <div className="select-container mt-10 w-25" ref={Menu}>
      <div
        className={
          "input-container " +
          (menuFlag === false ? " input-focus" : " input-blur")
        }
      >
        <div
          className={
            "custom-badge bg-black white" +
            (selected.option.length === 0 ? " hide" : " show-flex")
          }
        >
          {selected.option}
          <span
            className={"deselect-icon"}
            onClick={() => {
              changeSelection({ option: "" });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path
                stroke="white"
                strokeWidth={1}
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </span>
        </div>

        <input
          onFocus={() => toggleMenu(false)}
          type="text"
          className="select-input input-field p-10 w-100"
          placeholder="How did you hear about us "
          onChange={(e) => {
            getSearchResults(e);
          }}
        />
        <span
          className="select-button bg-gray icon"
          onClick={() => toggleMenu(!menuFlag)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-list p-10  text-center  white"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
          {/* <FontAwesomeIcon
            icon={faBars}
            className="icon p-10  text-center bg-gray white"
            size="lg"
          /> */}
        </span>
      </div>

      <div
        className={
          "select-menu bg-white p-10 black" +
          (menuFlag === true ? " hide" : " show border-top-none")
        }
      >
        <div
          className={
            "select-back mt-10 mb-10 " +
            (options.parent
              ? Object.keys(options.parent).length === 0
                ? "hide"
                : "show"
              : "hide")
          }
          onClick={() => {
            setOptions(options.parent);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              stroke="black"
              strokeWidth={1}
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
        </div>
        {options.val.map((entry: any) =>
          entry.child.length > 0 ? (
            <li
              className={
                "list-group-item border-none mt-15 black text-left " +
                (entry.child.length === 0 ? "disabled" : "enabled")
              }
              key={entry.id}
              onClick={() => {
                setTimeout(() => {
                  if (entry.child.length > 0)
                    setOptions({ val: entry.child, parent: options });
                });
              }}
            >
              {entry.title ? entry.title : entry.key}

              <span className="text-icon">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    stroke="black"
                    strokeWidth={1}
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </span>
            </li>
          ) : (
            <div
              key={entry.id}
              className="form-check select-radio list-group-item text-left mt-15 border-none"
              onClick={() =>
                changeSelection({
                  option: entry.title ? entry.title : entry.key,
                })
              }
            >
              <input
                className="form-check-input "
                type="radio"
                name="radio-selected"
                placeholder={entry.title ? entry.title : entry.key}
                checked={selected.option === entry.key ? true : undefined}
              />
              <label className="form-check-label">
                {entry.title ? entry.title : entry.key}
              </label>
            </div>
          )
        )}
      </div>
    </div>
  );
};
