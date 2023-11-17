import React, { useState } from "react";
import "./FoodList.css"
import toast from 'react-hot-toast';
const FoodList = ({ onSelectedFoodsChange }) => {
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [showSelectedFoods, setShowSelectedFoods] = useState(false);

  const handleCheckboxChange = (food) => {
    const updatedSelectedFoods = selectedFoods.includes(food)
      ? selectedFoods.filter((item) => item !== food)
      : [...selectedFoods, food];
      
      setSelectedFoods(updatedSelectedFoods);
 
  };

  const toggleShowSelectedFoods = () => {
    setShowSelectedFoods(!showSelectedFoods);
  };

  const handleDoneClick = () => {
    if (selectedFoods.length === 0) {
      toast.error("Food is not selected!");
      return;
    }

    onSelectedFoodsChange(selectedFoods);
    toast.success("Food Selected ")
    toggleShowSelectedFoods();
  };

  const foodItems = ["Pizza", "Burger", "Salad", "nonveg", "veg"]; // Add your list of food items here

  return (
    <div className="food_main">
      <h2>Select Food Items:</h2>
      {foodItems.map((food, index) => (
        <div key={index}>
          <label className="label">
            <input
              type="checkbox"
              checked={selectedFoods.includes(food)}
              onChange={() => handleCheckboxChange(food)}
            />
            {food}
          </label>
        </div>
      ))}
      <button onClick={handleDoneClick}>Done</button>

      {/* {showSelectedFoods && (
        <div>
          <h3>Selected Foods:</h3>
          <ul>
            {selectedFoods.map((food, index) => (
              <li key={index}>{food}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default FoodList;
