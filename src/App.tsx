import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Select } from './Select/Select';


const data = [
  {
    id: "trj8marhNp2XUPE1B0PzZ",
    title: "Social Media",
    child: [
      {
        key: "Facebook",
        value: "facebook",
        child: [],
        id: "7GmFbw6w3IW4ED3mnGX4l",
      },
      {
        key: "Indeed",
        value: "indeed",
        child: [],
        id: "QYA3DmGgEbHtuH6pfQPfH",
      },
    ],
  },
  {
    id: "ACCRNPv-kYdPGrRLpoQhU",
    title: "Event",
    child: [
      {
        key: "Tech Conf",
        value: "tech conf",
        child: [
          {
            key: "JS Conf",
            value: "js conf",
            child: [],
            id: "oX1t7XR5YGATqTHzCpeQd",
          },
          {
            key: "ng Conf",
            value: "ng conf",
            child: [],
            id: "1t7XR5YGATqTHzCpeQd",
          },
        ],
        id: "X1t7XR5YGATqTHzCpeQd",
      },
      {
        key: "Hiring Event",
        value: "hiring event",
        child: [],
        id: "UGnx-mdXuII5sbu5nmq5X",
      },
    ],
  },
  {
    id: "4Lahy3NYdgVrbraW5ixFj",
    title: "Others",
    child: [
      {
        key: "Job Board",
        value: "job board",
        child: [
          {
            key: "Naukri.com",
            value: "naukri",
            child: [],
            id: "bPoUqtF0J23r-0zDQr_cT",
          },
          {
            key: "Shine.com",
            value: "shine",
            child: [],
            id: "PoUqtF0J23r-0zDQr_cT",
          },
        ],
        id: "oUqtF0J23r-0zDQr_cT",
      },
      {
        key: "Hiring Board",
        value: "hiring",
        child: [],
        id: "Tf_jRS0PulSByZehlcnth",
      },
    ],
  },
];



function App() {
  return (
    <div className="App">
      <Select data={data}></Select>
    </div>
  );
}

export default App;
