# Bakery Demand Demo

[![Static Badge](https://img.shields.io/badge/Build-Passing-%23a9f378)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)]()
[![Status](https://img.shields.io/badge/Project-Active-brightgreen.svg)]()
![Org](https://img.shields.io/badge/Research-Sloxen™-black)
[![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20WIN%20%7C%20Linux%20%7C%20WSL%20%7C%20macOS-lightgrey)]()
## Table of Contents
- [Overview](#overview)
- [Dataset](#dataset)
- [Models list](#models-list)
- [Dataset split](#dataset-split)
- [Model performance](#model-performance)
- [Example visualisations](#example-visualisations)
- [Why](#why)
- [Next](#next)

---

## Overview

- Predict bakery item demand  
- Compare multiple models  
- Select the best-performing model  
- Evaluate on unseen test data  
- Keep everything simple, explainable, and robust  

---

## Dataset

Sell example csv file from [Kaggle](https://www.kaggle.com/datasets/akashdeepkuila/bakery/data):

| Transaction | sell_item | date_time | period_day | weekday_weekend |
|--------|------------|------------|------------|------------|
|1	|Bread	|10/30/2016 9:58	|morning	|weekend|
|2	|Scandinavian	|10/30/2016 10:05	|morning	|weekend|
|2	|Scandinavian	|10/30/2016 10:05	|morning	|weekend|
|3	|Hot chocolate	|10/30/2016 10:07	|morning	|weekend|
|3	|Jam	|10/30/2016 10:07	|morning	|weekend|

Each row represents sales for an item in a specific context:

| Feature | Description |
|--------|------------|
| sell_item | Product type (bread, cake, etc.) |
| period_day | Morning or Afternoon |
| weekday_weekend | Weekday or weekend |
| month | Seasonality |
| sales | Target variable |

---

## Models list

A few basic machine learning models are used in the training sets.

- Dummy mean (baseline)  
- Linear Regression  
- Random Forest   

Each model is wrapped in a pipeline:

```python
Pipeline([
    ("preprocessor", preprocessor),
    ("model", model)
])
```

---

## Dataset split

We use a time-aware split by first 75%, 15% and 15%:

| Split | Purpose |
|------|--------|
| Train | Learn patterns |
| Validation | Model selection |
| Test | Final evaluation |

This avoids data leakage and reflects real-world forecasting.

---

## Model performance

| Model | Validation RMSE (Rooted Mean Sequare Error) |
|------|----------------|
| Dummy | High |
| Linear | Medium |
| Random Forest | Low |

The best model is selected based on validation score, the lower RMSE is, the better the model performs. 

---

## Example visualisations

### Sales by item

```
Bread      ████████████
Cake       ███████
Pastry     █████████
```

### Sales by time

```
Morning    █████████████
Afternoon  ████████
```

### Model comparison

```
RMSE (lower is better)

Dummy          █████████████
Linear         ████████
RandomForest   ████
```

---

## Next 

- Add pricing features  
- Add promotions or events
- Deploy as API or dashboard  



