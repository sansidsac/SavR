import streamlit as st
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import joblib
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

# Load the Dataset
data = pd.read_csv('food_wastage_data.csv')

# Load the pre-trained model
model = joblib.load('food_wastage_model.pkl')

# Title of the Streamlit app
st.title('Food Wastage Data Analysis and Prediction')

# Display the dataset
st.subheader('Dataset')
st.write(data)

# Interactive plots using Streamlit
st.subheader('Interactive Plots')

# Select plot type
plot_type = st.selectbox('Select Plot Type', ['Pairplot', 'Correlation Matrix', 'Boxplot'])

if plot_type == 'Pairplot':
    st.write(sns.pairplot(data))
    st.pyplot()

elif plot_type == 'Correlation Matrix':
    numerical_cols = data.select_dtypes(include=['int64', 'float64']).columns
    plt.figure(figsize=(10, 8))
    sns.heatmap(data[numerical_cols].corr(), annot=True, cmap='coolwarm')
    st.pyplot()

elif plot_type == 'Boxplot':
    boxplot_feature = st.selectbox('Select Feature for Boxplot', data.columns[:-1])
    plt.figure(figsize=(15, 10))
    sns.boxplot(data=data, x=boxplot_feature, y='Wastage Food Amount')
    plt.title(f'Wastage Food Amount by {boxplot_feature}')
    st.pyplot()

# Prediction Section
st.subheader('Predict Food Wastage Amount')

# User inputs for prediction
type_of_food = st.selectbox('Type of Food', data['Type of Food'].unique())
number_of_guests = st.number_input('Number of Guests', min_value=1, max_value=1000, value=100)
event_type = st.selectbox('Event Type', data['Event Type'].unique())
quantity_of_food = st.number_input('Quantity of Food', min_value=1, max_value=1000, value=100)
storage_conditions = st.selectbox('Storage Conditions', data['Storage Conditions'].unique())
purchase_history = st.selectbox('Purchase History', data['Purchase History'].unique())
seasonality = st.selectbox('Seasonality', data['Seasonality'].unique())
preparation_method = st.selectbox('Preparation Method', data['Preparation Method'].unique())
geographical_location = st.selectbox('Geographical Location', data['Geographical Location'].unique())
pricing = st.selectbox('Pricing', data['Pricing'].unique())

# Create a DataFrame for the input
input_data = pd.DataFrame({
    'Type of Food': [type_of_food],
    'Number of Guests': [number_of_guests],
    'Event Type': [event_type],
    'Quantity of Food': [quantity_of_food],
    'Storage Conditions': [storage_conditions],
    'Purchase History': [purchase_history],
    'Seasonality': [seasonality],
    'Preparation Method': [preparation_method],
    'Geographical Location': [geographical_location],
    'Pricing': [pricing]
})

# Predict the food wastage amount
if st.button('Predict'):
    prediction = model.predict(input_data)
    st.write(f'Predicted Wastage Food Amount: {prediction[0]}')