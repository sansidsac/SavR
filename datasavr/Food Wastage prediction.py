#!/usr/bin/env python
# coding: utf-8

# In[34]:


# Import Required Libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error,  r2_score


# In[4]:


data = pd.read_csv('food_wastage_data.csv')


# In[5]:


# Explore the Dataset
print(data.head())
print(data.info())
print(data.describe())


# In[6]:


print(data.isnull().sum())


# In[7]:


# Visualize the data
sns.pairplot(data)
plt.show()


# In[9]:


# Correlation matrix for numerical columns only
numerical_cols = data.select_dtypes(include=['int64', 'float64']).columns
plt.figure(figsize=(10, 8))
sns.heatmap(data[numerical_cols].corr(), annot=True, cmap='coolwarm')
plt.show()


# In[10]:


# Visualize categorical attributes
plt.figure(figsize=(15, 10))
sns.countplot(data=data, x='Type of Food')
plt.title('Count of Different Types of Food')
plt.show()


# In[11]:


plt.figure(figsize=(15, 10))
sns.boxplot(data=data, x='Event Type', y='Wastage Food Amount')
plt.title('Wastage Food Amount by Event Type')
plt.show()


# In[12]:


plt.figure(figsize=(15, 10))
sns.boxplot(data=data, x='Storage Conditions', y='Wastage Food Amount')
plt.title('Wastage Food Amount by Storage Conditions')
plt.show()


# In[13]:


plt.figure(figsize=(15, 10))
sns.boxplot(data=data, x='Seasonality', y='Wastage Food Amount')
plt.title('Wastage Food Amount by Seasonality')
plt.show()


# In[14]:


plt.figure(figsize=(15, 10))
sns.boxplot(data=data, x='Preparation Method', y='Wastage Food Amount')
plt.title('Wastage Food Amount by Preparation Method')
plt.show()


# In[15]:


plt.figure(figsize=(15, 10))
sns.boxplot(data=data, x='Geographical Location', y='Wastage Food Amount')
plt.title('Wastage Food Amount by Geographical Location')
plt.show()


# In[16]:


plt.figure(figsize=(15, 10))
sns.boxplot(data=data, x='Pricing', y='Wastage Food Amount')
plt.title('Wastage Food Amount by Pricing')
plt.show()


# In[17]:


# Preprocess the Data
# Separate features and target variable
X = data.drop('Wastage Food Amount', axis=1)
y = data['Wastage Food Amount']


# In[18]:


# Identify categorical and numerical columns
categorical_cols = X.select_dtypes(include=['object']).columns
numerical_cols = X.select_dtypes(include=['int64', 'float64']).columns


# In[19]:


# Preprocessing for numerical data
numerical_transformer = StandardScaler()


# In[20]:


# Preprocessing for categorical data
categorical_transformer = OneHotEncoder(handle_unknown='ignore')


# In[21]:


# Bundle preprocessing for numerical and categorical data
preprocessor = ColumnTransformer(
    transformers=[
        ('num', numerical_transformer, numerical_cols),
        ('cat', categorical_transformer, categorical_cols)
    ])


# In[22]:


# Define the model
model = RandomForestRegressor(n_estimators=100, random_state=0)


# In[23]:


# Create and evaluate the pipeline
pipeline = Pipeline(steps=[('preprocessor', preprocessor),
                           ('model', model)
                          ])


# In[24]:


model


# In[25]:


# Split the Data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)


# In[26]:


# Train the Model
pipeline.fit(X_train, y_train)


# In[27]:


# Evaluate the Model
y_pred = pipeline.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f'Mean Squared Error: {mse}')


# In[28]:


# Visualize the predictions
plt.figure(figsize=(10, 6))
plt.scatter(y_test, y_pred)
plt.xlabel('Actual Wastage Food Amount')
plt.ylabel('Predicted Wastage Food Amount')
plt.title('Actual vs Predicted Wastage Food Amount')
plt.show()


# In[35]:


# Evaluate the Model
y_pred = pipeline.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
print(f'Mean Squared Error: {mse}')
print(f'R^2 Score: {r2}')


# In[36]:


import joblib

# Save the model
joblib.dump(pipeline, 'food_wastage_model.pkl')


# In[ ]:




