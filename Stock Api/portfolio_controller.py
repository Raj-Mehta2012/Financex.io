import json, re, cherrypy

class PortfolioController(object): 
    
    def __init__(self):
        self.portfolio_stocks = dict()
    
    def get_stocks(self):
        return self.portfolio_stocks.keys()

    def get_stock(self, name):
        name = str(name)
        print("Inside get_stock")
        try:
            quantity = int(self.portfolio_stocks[name])

        except Exception as ex:
                details = None
        return quantity    

    def delete_stock(self, name):
        del self.portfolio_stocks[name]

    def set_stock(self, name, details):
        self.portfolio_stocks[name] = details[0]




    def GET_KEY(self,name):
        output = {'result' : 'success'}
        stock_name = str(name)
        try:
            details = self.get_stock(stock_name)
            if details is not None:
                output['stock'] = stock_name
            #    print("Hello")
                output['quantity'] = str(details[0])
				#output['quantity'] = details[0]
            else:
                output ['result'] = 'error'
                print("Hello")
                output['message'] = "Stock not found"
			#	output['message'] = 'Stock not found'
				            
        except Exception as ex:
            output['result'] = 'error'
            output['message'] = str(ex)
        return json.dumps(output)

    def GET_INDEX(self):
        output = {'result' : 'success'}
        output['stocks'] = []
        try:
            stocks = self.get_stocks()
            print("Printing Stocks:", stocks)

            for stock_name in stocks:
                print(stock_name)
                stock = self.get_stock(stock_name)
                print(stock)
                dstock = {'stock': stock_name, 'quantity': stock}
                output['stocks'].append(dstock)

                
        except Exception as ex:
            output['result'] = 'error'
            output['message'] = str(ex)
        return json.dumps(output)
    

    def POST_INDEX(self):
        output = { 'result' : 'success'}
        print(output)
        data = json.loads(cherrypy.request.body.read().decode('utf-8'))
        print(data)

        try:
            self.portfolio_stocks[data['name']] = int(data['qty'])

            output['stock'] = data['name']
            output['quantity'] = int(data['qty'])
            print(output)
            print(self.portfolio_stocks)
        except Exception as ex:
            output['result'] = 'failure'
            output['message'] = str(ex)
        return json.dumps(output)

    def DELETE_KEY(self, name):
        output = {'result' : 'success'}
        name = str(name)

        try:
            self.delete_stock(name)
            print("Delete Successful")
            print(self.portfolio_stocks)

        except Exception as ex:
            output['result'] = 'failure'
            output['message'] = str(ex)
        return json.dumps(output)
   
    def PUT_KEY(self, name):
        output = {'result' : 'success'}
        name = str(name)
        data = json.loads(cherrypy.request.body.read().decode('utf-8'))
        print("Prining put name: ", name)
        print(data)

        try:
            stock = list()
            stock.append(data['qty'])
            self.set_stock(name,stock)

            output['result'] = 'Quantity Updated'
            output['stock'] = name
            output['quantity'] = int(data['qty'])

            print("SUCCESSFULLY UPDATED")
            print(self.portfolio_stocks)
            
        except Exception as ex:
            output['result'] = 'error'
            output['message'] = str(ex)
        return json.dumps(output)