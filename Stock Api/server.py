import routes
import cherrypy
from stock_controller import StockController
from portfolio_controller import PortfolioController

def start_service():
    #TODO create a controller obj
    d_cont = StockController()
    p_cont = PortfolioController()
    

    #TODO setup dispacher
    dispatcher = cherrypy.dispatch.RoutesDispatcher()

    # connect resources endpoints using dispacher

    #put_key
    dispatcher.connect('dict_put_key', '/stockinfo/:key', controller= d_cont, action='GET_StockInfo', 
    conditions=dict(method=['GET']) )

   # dispatcher.connect('dict_get_key_stock', '/portfolio/:key', controller= p_cont, action='GET_StockQuantity', conditions=dict(method=['GET']) )

    #post
    dispatcher.connect('dict_post_method', '/stockdetailedinfo/:key', controller= d_cont, action='GET_StockDetailedInfo', 
    conditions=dict(method=['GET']) )

    #Get_key
    dispatcher.connect('dict_get_key', '/stockpredictions/:key', controller= d_cont, action='GET_StockPrediction', 
    conditions=dict(method=['GET']) )

    #PORTFOLIO CODE---------------------------------------------------------

    #Portfolio_GET_KEY
    dispatcher.connect('Portfolio_GET', '/portfolio/:name', controller= p_cont, action='GET_KEY', conditions=dict(method=['GET']) ) #done

    #Portfolio_GET_ALL_KEY
    dispatcher.connect('Portfolio_GET_ALL', '/portfolio/', controller= p_cont, action='GET_INDEX', conditions=dict(method=['GET']) )    #done


    #Portfolio_Post_key
    dispatcher.connect('dict_portfolio_post', '/portfolio/', controller= p_cont, action='POST_INDEX', conditions=dict(method=['POST']) )

    #Portfolio_Delete_key
    dispatcher.connect('dict_portfolio_delete', '/portfolio/:name', controller= p_cont, action='DELETE_KEY', conditions=dict(method=['DELETE']) )

    #Portfolio_Put_key
    dispatcher.connect('dict_portfolio_put', '/portfolio/:name', controller= p_cont, action='PUT_KEY', conditions=dict(method=['PUT']) )

    dispatcher.connect('dict_options', '/dictionary/', controller=optionsController, action='OPTIONS', conditions=dict(method=['OPTIONS']))
    dispatcher.connect('dict_key_options', '/dictionary/:key', controller=optionsController, action='OPTIONS', conditions=dict(method=['OPTIONS']))

    # configure server
    conf = {
        'global': {
            'server.thread_pool': 5,
            'server.socket_host': 'localhost', #student04.cse.nd.edu
            'server.socket_port' : 51056
        },
        '/': {
            'request.dispatch' : dispatcher,
            'tools.CORS.on' : True, # configuration for CORS
        }
    }

    #update conf with cherrypy
    cherrypy.config.update(conf)
    app = cherrypy.tree.mount(None, config = conf)

    #TODO start server
    cherrypy.quickstart(app)

class optionsController:
    def OPTIONS(self, *args, **kwargs):
        return ""

# function for CORS
def CORS():
    cherrypy.response.headers["Access-Control-Allow-Origin"] = "*"
    cherrypy.response.headers["Access-Control-Allow-Methods"] = "GET, PUT, POST, DELETE, OPTIONS"
    cherrypy.response.headers["Access-Control-Allow-Credentials"] = "true"


if __name__ == '__main__':
    cherrypy.tools.CORS = cherrypy.Tool('before_finalize', CORS) # CORS
    start_service()