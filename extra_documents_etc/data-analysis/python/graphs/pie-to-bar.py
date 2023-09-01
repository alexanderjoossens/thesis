import matplotlib.pyplot as plt

data = [6, 1, 3, 2, 7, 9, 7, 8, 4, 4, 4, 7, 5, 6, 2, 4, 6, 4, 5, 5, 9, 6, 5, 7, 7, 5, 6, 4, 9, 6, 6, 9, 6, 5, 4, 6, 5, 5, 5, 6, 5, 4, 6, 8, 3, 1, 5, 6, 4, 2, 3, 6, 7, 5, 3, 6, 8, 8, 7, 4, 5, 5, 6, 6, 8, 1, 5, 7, 6, 6, 5, 5, 6, 7, 8, 6, 9, 5, 7, 4, 4]

# Count the frequency of each response
frequency = {}
for year in data:
    if year in frequency:
        frequency[year] += 1
    else:
        frequency[year] = 1

# Sort the data by years in ascending order
sorted_data = sorted(frequency.items())

# Separate the years and their frequencies
years, counts = zip(*sorted_data)

# Create the bar graph with color '#4BE27F'
plt.bar(years, counts, color='#4BE27F')

# Set labels and title
plt.xlabel("Number of years")
plt.ylabel("Amount of users")
plt.title("For how many years have you been using Spotify?")

# Set y-axis marks at intervals of 5
plt.yticks(range(0, max(counts)+1, 5))
plt.xticks(range(1, max(years)+1, 1))
# Remove comma separators from y-axis marks
plt.gca().get_yaxis().get_major_formatter().set_scientific(False)

# Show the bar graph
plt.show()






data = ['2-5', '1-2', '2-5', '2-5', '20+', '5-10', '5-10', '10-20', '20+', '20+', '20+', '10-20', '5-10', '10-20', '1-2', '5-10', '2-5', '5-10', '5-10', '2-5', '10-20', '5-10', '20+', '5-10', '20+', '10-20', '5-10', '1-2', '10-20', '10-20', '20+', '5-10', '10-20', '1-2', '5-10', '2-5', '10-20', '5-10', '5-10', '1-2', '5-10', '5-10', '10-20', '2-5', '2-5', '5-10', '20+', '10-20', '2-5', '5-10', '5-10', '5-10', '5-10', '20+', '20+', '10-20', '10-20', '10-20', '5-10', '2-5', '10-20', '10-20', '10-20', '10-20', '2-5', '1-2', '1-2', '5-10', '2-5', '20+', '20+', '20+', '2-5', '20+', '20+', '5-10', '1-2', '10-20', '10-20', '2-5', '1-2']

# Count the frequency of each response
frequency = {}
for hours in data:
    if hours in frequency:
        frequency[hours] += 1
    else:
        frequency[hours] = 1

# Sort the data by hours in ascending order
sorted_data = sorted(frequency.items(), key=lambda x: ['1-2', '2-5', '5-10', '10-20', '20+'].index(x[0]))

# Separate the hours and their frequencies
hours, counts = zip(*sorted_data)

# Create the bar graph with color '#4BE27F'
plt.bar(hours, counts, color='#4BE27F')

# Set labels and title
plt.xlabel("Weekly Usage (hours)")
plt.ylabel("Amount of users")
plt.title("How many hours a week do you use Spotify?")

# Set x-axis marks at intervals of 1
plt.xticks(range(len(hours)), hours)

# Set y-axis marks at intervals of 5
plt.yticks(range(0, max(counts)+1, 5))

# Remove comma separators from y-axis marks
plt.gca().get_yaxis().get_major_formatter().set_scientific(False)

# Show the bar graph
plt.show()
