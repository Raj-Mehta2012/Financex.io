import pandas_datareader as web
import numpy as np
import pandas as pd
import math
import os
from keras.models import Sequential, load_model
from keras.layers import Dense, Dropout
from keras.layers import LSTM
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error
from datetime import date

def temp_func(key):
    today = date.today()
    d1 = today.strftime("%m/%d/%Y")


    data= web.DataReader(key, data_source='yahoo', start='01/22/1999', end=d1)
    print(data)
    dataset = data['Adj Close'].values

    dataset = dataset.reshape(-1,1)


    dataset_train = np.array(dataset[:int(dataset.shape[0]*0.8)])
    training_dataset_length = math.ceil(len(dataset) * .8)
    dataset_test = np.array(dataset[int(dataset.shape[0]*0.8):])


    scaler = MinMaxScaler(feature_range=(0,1))
    dataset_train = scaler.fit_transform(dataset_train)
    dataset_test = scaler.fit_transform(dataset_test)

    look_back = 1 
    def create_dataset(dataset):
        x, y = [],[]
        for i in range(len(dataset)-look_back-1):
            a = dataset[i:i+look_back, 0]
            x.append(a)
            y.append(dataset[i+look_back+1, 0])

        dataX = np.array(x)
        dataY = np.array(y)
        return dataX, dataY

    # reshape into X=t and Y=t+1
    trainX, trainY = create_dataset(dataset_train)
    testX, testY = create_dataset(dataset_test)


    # reshape input to be [samples, time steps, features]
    trainX = np.reshape(trainX, (trainX.shape[0], trainX.shape[1], 1))
    testX = np.reshape(testX, (testX.shape[0], testX.shape[1], 1))

    # create and fit the LSTM network
    model = Sequential()
    model.add(LSTM(4, input_shape=(1, 1)))
    model.add(Dense(1))
    model.compile(loss='mean_squared_error', optimizer='adam')
    model.fit(trainX, trainY, epochs=10, batch_size=10, verbose=2)

    predictions = model.predict(testX)

    mse = np.mean((predictions-testX)**2)
    print("MeanSquaredError is :", mse)

    predictions = scaler.inverse_transform(predictions)

    y_test_scaled = scaler.inverse_transform(testY.reshape(-1,1))
    print("\n Predicted Value:", predictions[-1])
    temp_variable = predictions[-1].tolist()

    return temp_variable[0]

