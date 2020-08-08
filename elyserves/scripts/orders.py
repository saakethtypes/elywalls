import pymongo
import time
import datetime

myclient = pymongo.MongoClient("mongodb+srv://saaketh:indyadmin@indywallscluster-0knaf.mongodb.net/test?authSource=admin&replicaSet=indywallsCluster-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true")
mydb = myclient["test"]
mycol = mydb["orders"]
artistscol = mydb["artists"]
artists = artistscol.find()
sd = 6
def send_orders_per_day(sd):
    start = datetime.datetime(2020, 8, sd, 0, 0, 0)
    end   = start + datetime.timedelta(days=1)
    x = mycol.find({'orderedOn': {'$lt': end, '$gte': start}})
    for doc in x:
        print(doc['orderedOn'])
        #send email with pics
        
    #clear artists wek sales and pay them
    if(start.weekday()==4):
        for artist in artists:
            amount_due = artist['current_week_sales']
            artistscol.update_one({'username':artist['username']},
            {"$set": { "current_week_sales": 0 }})
            print(artist['username'] + " - " ,amount_due)
            #send email to payer and artist
            

while(True):
    print("Orders Summary-" + str(sd) + " sent")
    time.sleep(3)
    send_orders_per_day(sd)
    sd = sd+1
