import matplotlib.pyplot as plt
import numpy as np




#q5
# species = ("Pre-filtering", "Post-filtering")
# penguin_means = {
#     'Content-based visual': (3.775, 4.25),
#     'User-based visual': (3.1, 4.2),
# }

# x = np.arange(len(species))  # the label locations
# width = 0.35  # the width of the bars
# multiplier = 0.5
# colors = ['#4BE27F', '#9A59F7']

# fig, ax = plt.subplots(layout='constrained')

# for i, (attribute, measurement) in enumerate(penguin_means.items()):
#     offset = width * multiplier
#     rects = ax.bar(x + offset, measurement, width, label=attribute,color = colors[i])
#     ax.bar_label(rects, padding=3)
#     multiplier += 1

# # Add some text for labels, title and custom x-axis tick labels, etc.
# ax.set_ylabel('Average response with 1: Do not agree and 5: Agree')
# ax.set_title('I will use this recommender again if I need to create a playlist with other people.')
# ax.set_xticks(x + width, species)
# ax.legend(loc='upper left', ncols=3)
# ax.set_ylim(1, 5)

# plt.show()

#q25
# species = ("Pre-filtering", "Post-filtering")
# penguin_means = {
#     'Content-based visual': (3.725, 4.25),
#     'User-based visual': (3, 3.9),
# }

# x = np.arange(len(species))  # the label locations
# width = 0.35  # the width of the bars
# multiplier = 0.5
# colors = ['#4BE27F', '#9A59F7']

# fig, ax = plt.subplots(layout='constrained')

# for i, (attribute, measurement) in enumerate(penguin_means.items()):
#     offset = width * multiplier
#     rects = ax.bar(x + offset, measurement, width, label=attribute,color = colors[i])
#     ax.bar_label(rects, padding=3)
#     multiplier += 1

# # Add some text for labels, title and custom x-axis tick labels, etc.
# ax.set_ylabel('Average response with 1: Do not agree and 5: Agree')
# ax.set_title('I will tell my friends about this recommender')
# ax.set_xticks(x + width, species)
# ax.legend(loc='upper left', ncols=3)
# ax.set_ylim(1, 5)

# plt.show()

#q4
# species = ("Pre-filtering", "Post-filtering")
# penguin_means = {
#     'Content-based visual': (3.65, 4.05),
#     'User-based visual': (3.3, 3.7),
# }

# x = np.arange(len(species))  # the label locations
# width = 0.35  # the width of the bars
# multiplier = 0.5
# colors = ['#4BE27F', '#9A59F7']

# fig, ax = plt.subplots(layout='constrained')

# for i, (attribute, measurement) in enumerate(penguin_means.items()):
#     offset = width * multiplier
#     rects = ax.bar(x + offset, measurement, width, label=attribute,color = colors[i])
#     ax.bar_label(rects, padding=3)
#     multiplier += 1

# # Add some text for labels, title and custom x-axis tick labels, etc.
# ax.set_ylabel('Average response with 1: Do not agree and 5: Agree')
# ax.set_title('The recommender explains why the songs are recommended to me.')
# ax.set_xticks(x + width, species)
# ax.legend(loc='upper left', ncols=3)
# ax.set_ylim(1, 5)

# plt.show()


#q6
# species = ("Pre-filtering", "Post-filtering")
# penguin_means = {
#     'Content-based visual': (3.675, 3.95),
#     'User-based visual': (3.35, 4.05),
# }

# x = np.arange(len(species))  # the label locations
# width = 0.35  # the width of the bars
# multiplier = 0.5
# colors = ['#4BE27F', '#9A59F7']

# fig, ax = plt.subplots(layout='constrained')

# for i, (attribute, measurement) in enumerate(penguin_means.items()):
#     offset = width * multiplier
#     rects = ax.bar(x + offset, measurement, width, label=attribute,color = colors[i])
#     ax.bar_label(rects, padding=3)
#     multiplier += 1

# # Add some text for labels, title and custom x-axis tick labels, etc.
# ax.set_ylabel('Average response with 1: Do not agree and 5: Agree')
# ax.set_title('The information provided is sufficient to make a song listen decision')
# ax.set_xticks(x + width, species)
# ax.legend(loc='upper left', ncols=3)
# ax.set_ylim(1, 5)

# plt.show()



#q9
species = ("Pre-filtering", "Post-filtering")
penguin_means = {
    'Content-based visual': (3.7875, 3.85),
    'User-based visual': (3.5, 4.25),
}

x = np.arange(len(species))  # the label locations
width = 0.35  # the width of the bars
multiplier = 0.5
colors = ['#4BE27F', '#9A59F7']

fig, ax = plt.subplots(layout='constrained')

for i, (attribute, measurement) in enumerate(penguin_means.items()):
    offset = width * multiplier
    rects = ax.bar(x + offset, measurement, width, label=attribute,color = colors[i])
    ax.bar_label(rects, padding=3)
    multiplier += 1

# Add some text for labels, title and custom x-axis tick labels, etc.
ax.set_ylabel('Average response with 1: Do not agree and 5: Agree')
ax.set_title('The recommender allows me to tell what I like/dislike.')
ax.set_xticks(x + width, species)
ax.legend(loc='upper left', ncols=3)
ax.set_ylim(1, 5)

plt.show()