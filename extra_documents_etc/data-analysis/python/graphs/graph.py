import numpy as np
import matplotlib.pyplot as plt
 
  
# # creating the dataset
# data = {'Algorithm 1/Visual 1':3.775, 'Algorithm 2/Visual 1':4.25, 'Algorithm 1/Visual 2':3.1,
#         'Algorithm 2/Visual 2':4.2}
# courses = list(data.keys())
# values = list(data.values())
  
# fig = plt.figure(figsize = (10, 5))
 
# # creating the bar plot
# plt.bar(courses, values, color ='green',
#         width = 0.4)
 
# plt.xlabel("")
# plt.ylabel("Average response with 1: Do not agree and 5: Agree")
# plt.title("I will use this recommender again if I need to create a playlist with other people.")
# plt.show()


# FOR THE BUTTON CLICKS
# creating the dataset
data = {'Pre-filtering/Content-based':12, 'Post-filtering/Content-based':9, 
        'Pre-filtering/User-based':9,
        'Post-filtering/User-based':10}
courses = list(data.keys())
values = list(data.values())
  
fig = plt.figure(figsize = (10, 5))
 
# creating the bar plot
plt.bar(courses, values, color ='#4BE27F',
        width = 0.4)
 
plt.xlabel("")
plt.ylabel("Amount of users that clicked the button")
plt.title("Number of users that added the new playlist to their Spotify account")
plt.show()