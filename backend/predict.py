import sys
import pandas as pd
import joblib

# Load the pre-trained model
model = joblib.load('food_wastage_model.pkl')

# Read input data from command line arguments
input_data = pd.DataFrame([{
    'Type of Food': sys.argv[1],
    'Number of Guests': int(sys.argv[2]),
    'Event Type': sys.argv[3],
    'Quantity of Food': int(sys.argv[4]),
    'Storage Conditions': sys.argv[5],
    'Purchase History': sys.argv[6],
    'Seasonality': sys.argv[7],
    'Preparation Method': sys.argv[8],
    'Geographical Location': sys.argv[9],
    'Pricing': sys.argv[10]
}])

# Predict the food wastage amount
prediction = model.predict(input_data)
print(prediction[0])