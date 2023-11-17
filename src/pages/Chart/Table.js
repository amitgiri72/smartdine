import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import "./Table.css"; 

// make sure to replace with your own Firebase config
const firebaseConfig = {
  // firebase config
  apiKey: "your apiKey",
  authDomain: "Your authDomain",
  projectId: "your projectId",
  storageBucket: "your storageBucket",
  messagingSenderId: "your messagingSenderId",
  appId: "your appId",
  measurementId: "your measurementId",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



const TableSad = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const expressionsRef = collection(db, "expressions");
      const snapshot = await getDocs(expressionsRef);
      const documents = snapshot.docs.map((doc) => doc.data());
      setData(documents);
    };

    fetchData();
  }, []);

  // Count occurrences of each food for all expressions
  const foodCountsAllExpressions = data.reduce((acc, item) => {
    item.foods.forEach((foodItem) => {
      acc[foodItem.food] = (acc[foodItem.food] || 0) + 1;
    });
    return acc;
  }, {});

  // Filter data for "sad" expression
  const sadExpressionData =
    data.filter((item) => item.expression === "sad") || [];

  // Count occurrences of each food for "sad" expression
  const foodCountsSadExpression = sadExpressionData.reduce((acc, item) => {
    item.foods.forEach((foodItem) => {
      acc[foodItem.food] = (acc[foodItem.food] || 0) + 1;
    });
    return acc;
  }, {});

  // Filter data for "happy" expression
  const happyExpressionData =
    data.filter((item) => item.expression === "happy") || [];

  // Count occurrences of each food for "happy" expression
  const foodCountsHappyExpression = happyExpressionData.reduce((acc, item) => {
    item.foods.forEach((foodItem) => {
      acc[foodItem.food] = (acc[foodItem.food] || 0) + 1;
    });
    return acc;
  }, {});

  // Filter data for "neutral" expression
  const neutralExpressionData =
    data.filter((item) => item.expression === "neutral") || [];

  // Count occurrences of each food for "neutral" expression
  const foodCountsNeutralExpression = neutralExpressionData.reduce(
    (acc, item) => {
      item.foods.forEach((foodItem) => {
        acc[foodItem.food] = (acc[foodItem.food] || 0) + 1;
      });
      return acc;
    },
    {}
  );

  const worstFood = Object.keys(foodCountsSadExpression).filter((food) => {
    const sadPercentage =
      ((foodCountsSadExpression[food] || 0) /
        (foodCountsAllExpressions[food] || 1)) *
      100;
    return sadPercentage > 60;
  });

  return (
    <div className="table">
      <div className="table-container">
        <h1>Customer Food Review Data</h1>
        <table className="data-table">
          <thead>
            <tr>
              <th>Food Name</th>
              <th>Total Count (All Expressions)</th>
              <th>Bad Food (Count)</th>
              <th>Bad Food (percentage)</th>
              <th>Good Food (Count)</th>
              <th>Good Foodc(percentage)</th>
              <th>Average Food(count)</th>
              <th>Average Food (Percentage)</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(foodCountsAllExpressions).map((food) => (
              <tr key={food}>
                <td>{food}</td>
                <td>{foodCountsAllExpressions[food] || 0}</td>
                <td>{foodCountsSadExpression[food] || 0}</td>
                <td>
                  {(
                    ((foodCountsSadExpression[food] || 0) /
                      (foodCountsAllExpressions[food] || 1)) *
                    100
                  ).toFixed(2)}
                  %
                </td>
                <td>{foodCountsHappyExpression[food] || 0}</td>
                <td>
                  {(
                    ((foodCountsHappyExpression[food] || 0) /
                      (foodCountsAllExpressions[food] || 1)) *
                    100
                  ).toFixed(2)}
                  %
                </td>
                <td>{foodCountsNeutralExpression[food] || 0}</td>
                <td>
                  {(
                    ((foodCountsNeutralExpression[food] || 0) /
                      (foodCountsAllExpressions[food] || 1)) *
                    100
                  ).toFixed(2)}
                  %
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-container">
        <h1>Bad Food Data</h1>
        <table className="data-table">
          <thead>
            <tr>
              <th>Food Name</th>
              <th>Count</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(foodCountsSadExpression).map((food) => (
              <tr key={food}>
                <td>{food}</td>
                <td>{foodCountsSadExpression[food] || 0}</td>
                <td>
                  {(
                    ((foodCountsSadExpression[food] || 0) /
                      (foodCountsAllExpressions[food] || 1)) *
                    100
                  ).toFixed(2)}
                  %
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-container">
        <h1>Worst Food Data(Food that have more than 60% bad rating)</h1>
        <table className="data-table">
          <thead>
            <tr>
              <th>Food Name</th>
              <th>Count</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {worstFood.map((food) => (
              <tr key={food}>
                <td>{food}</td>
                <td>{foodCountsSadExpression[food] || 0}</td>
                <td>
                  {(
                    ((foodCountsSadExpression[food] || 0) /
                      (foodCountsAllExpressions[food] || 1)) *
                    100
                  ).toFixed(2)}
                  %
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSad;
