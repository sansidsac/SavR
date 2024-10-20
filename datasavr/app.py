import streamlit as st
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Load the Dataset
data = pd.read_csv('food_wastage_data.csv')

# Title of the Streamlit app
st.title('Food Wastage Data Analysis')

# Display the dataset
st.subheader('Dataset')
st.write(data)

# Visualize the data
st.subheader('Pairplot')
sns.pairplot(data)
st.pyplot()

# Correlation matrix for numerical columns only
st.subheader('Correlation Matrix')
numerical_cols = data.select_dtypes(include=['int64', 'float64']).columns
plt.figure(figsize=(10, 8))
sns.heatmap(data[numerical_cols].corr(), annot=True, cmap='coolwarm')
st.pyplot()

# Visualize categorical attributes
st.subheader('Count of Different Types of Food')
plt.figure(figsize=(15, 10))
sns.countplot(data=data, x='Type of Food')
plt.title('Count of Different Types of Food')
st.pyplot()

st.subheader('Wastage Food Amount by Event Type')
plt.figure(figsize=(15, 10))
sns.boxplot(data=data, x='Event Type', y='Wastage Food Amount')
plt.title('Wastage Food Amount by Event Type')
st.pyplot()

st.subheader('Wastage Food Amount by Storage Conditions')
plt.figure(figsize=(15, 10))
sns.boxplot(data=data, x='Storage Conditions', y='Wastage Food Amount')
plt.title('Wastage Food Amount by Storage Conditions')
st.pyplot()

st.subheader('Wastage Food Amount by Seasonality')
plt.figure(figsize=(15, 10))
sns.boxplot(data=data, x='Seasonality', y='Wastage Food Amount')
plt.title('Wastage Food Amount by Seasonality')
st.pyplot()

st.subheader('Wastage Food Amount by Preparation Method')
plt.figure(figsize=(15, 10))
sns.boxplot(data=data, x='Preparation Method', y='Wastage Food Amount')
plt.title('Wastage Food Amount by Preparation Method')
st.pyplot()

st.subheader('Wastage Food Amount by Geographical Location')
plt.figure(figsize=(15, 10))
sns.boxplot(data=data, x='Geographical Location', y='Wastage Food Amount')
plt.title('Wastage Food Amount by Geographical Location')
st.pyplot()

st.subheader('Wastage Food Amount by Pricing')
plt.figure(figsize=(15, 10))
sns.boxplot(data=data, x='Pricing', y='Wastage Food Amount')
plt.title('Wastage Food Amount by Pricing')
st.pyplot()