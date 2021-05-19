import json, re, cherrypy

from datetime import date


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
import prediction_model as mp

class StockController:

    
    look_back = 1

    def __init__(self):
        print("def cons")

    def create_dataset(self,dataset):
        x, y = [],[]
        for i in range(len(dataset)-look_back-1):
            a = dataset[i:i+look_back, 0]
            x.append(a)
            y.append(dataset[i+look_back+1, 0])
        dataX = np.array(x)
        dataY = np.array(y)
        return dataX, dataY


    def GET_StockInfo(self, key):
        try:
            output = {'result' : 'success'}
            key = str(key)

            today = date.today()
            d1 = today.strftime("%m/%d/%Y")

            print('Here is the key',key)
            data= web.DataReader(key, data_source='yahoo', start='01/22/1999', end=d1)
            dataset = data['Adj Close'].values
            output['ClosingPrice'] = dataset[-1]
            print("Your current Stock closing Price is : ", output['ClosingPrice'])
        except Exception as ex:
            output['result'] = 'error'
            output['message'] = str(ex)
        return json.dumps(output)

    def GET_StockDetailedInfo(self, key):
        try:
            output = {'result' : 'success'}
            key = str(key)

            today = date.today()
            d1 = today.strftime("%m/%d/%Y")

            data= web.DataReader(key, data_source='yahoo', start='01/22/1999', end=d1)
            dataset = data['Adj Close'].values

            abc = pd.Series(dataset).to_json(orient='values')
            print(abc)

            output['ClosingPrice'] = abc
        except Exception as ex:
            output['result'] = 'error'
            output['message'] = str(ex)
        return json.dumps(output)

    def GET_StockPrediction(self, key):
        try:
            output = {'result' : 'success'}
            key = str(key)

            predicted_value = mp.temp_func(key)
          #  mp.temp_func(key)
            output['ClosingPrice'] = predicted_value
            

        except Exception as ex:
            output['result'] = 'error'
            output['message'] = str(ex)
        return json.dumps(output)

    
