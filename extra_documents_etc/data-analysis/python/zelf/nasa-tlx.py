import pandas as pd
import statsmodels.api as sm
import numpy as np
from statsmodels.formula.api import ols

def average_per_question(question_data, question_col):
    # calculate the average for the given question
    values = values_per_question(question_data, question_col)
    sum = 0
    for i in range(0, len(values)):
        sum += values[i]
    return sum/len(values)

def std_dev_per_question(question_data, question_col):
    # calculate the standard deviation for the given question
    values = values_per_question(question_data, question_col)
    return np.std(values).round(2)


def values_per_question(question_data, question_col, skip_first=True):
    """Returns a list of lists with the values for the given question"""
    """Returns a list of len 79 because first question is code"""
    if skip_first:
        values = []
        for i in range(0, len(question_data)):
            for j in range(1, len(question_data[i])):
                if j == question_col:
                    values.append(question_data[i][j])
        return values
    else:
        values = []
        for i in range(0, len(question_data)):
            for j in range(0, len(question_data[i])):
                if j == question_col:
                    values.append(question_data[i][j])
        return values


def two_way_anova(question_data, question_col, skip_first=True):
# Create a DataFrame with the data (Exercise Type A and C are algorithm 1, B and D are algorithm 2. Gender M is visual 1, F is visual 2)
    print('len question data: ', len(question_data))
    print('question col: ', question_col)
    print('valuesperquestion: ', values_per_question(question_data, question_col, skip_first))
    print('len(valuesperquestion): ', len(values_per_question(question_data, question_col)))
    data = pd.DataFrame({
        'Algo': ['B', 'B', 'B', 'B', 'B', 'B', 'A', 'A', 'A', 'A', 'B', 'B', 'B', 'A', 'A', 'A', 'A', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'A', 'A', 'B', 'B', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'B', 'A', 'A', 'A', 'A', 'B', 'A', 'A', 'A', 'A', 'A', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'A', 'A', 'A', 'A', 'B', 'B', 'B', 'B', 'A', 'A', 'B', 'B', 'B', 'A', 'A', 'B', 'B', 'A', 'A', 'A', 'A', 'A', 'A'],
        'Visual': ['M', 'M', 'F', 'F', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'F', 'F', 'F', 'F', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'F', 'F', 'M', 'M', 'F', 'F', 'F', 'F', 'F', 'M', 'M', 'F', 'F', 'F', 'F', 'M', 'F', 'F', 'F', 'M', 'F', 'F', 'F', 'F', 'M', 'M', 'F', 'F', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'F', 'F', 'M', 'M', 'F', 'F', 'F', 'F', 'F', 'F', 'M', 'F', 'F', 'M', 'M', 'F', 'F', 'M', 'M', 'F', 'F', 'M', 'M'],
        'Value': values_per_question(question_data, question_col)
    })

    # Fit the ANOVA model
    model = ols('Value ~ Algo + Visual + Algo:Visual', data=data).fit()

    # Perform the ANOVA test
    anova_table = sm.stats.anova_lm(model, typ=2)

    # Print the ANOVA table
    print(anova_table)

def investigate_all_questions(question_data, skip_first=True):
    for i in range(1, len(question_data[0])):
        print("Question " + str(i) + ":")
        print("Average: " + str(average_per_question(question_data, i)))
        print("Standard deviation: " + str(std_dev_per_question(question_data, i)))
        print("ANOVA:")
        two_way_anova(question_data, i, skip_first)
        print("")

def multiply_list_val(list, value):
    new_list = []
    for i in list:
        new_list.append(i * value)
    return new_list

def investigate_all_constructs(construct_data, skip_first=False):
    for i in range(len(construct_data)):
        print("Construct " + str(i) + ":")
        # print("Average: " + str(average_per_question(construct_data, i)))
        # print("Standard deviation: " + str(std_dev_per_question(construct_data, i)))
        print("ANOVA:")
        two_way_anova_for_construct(construct_data, i, skip_first)
        print("")

def two_way_anova_for_construct(question_data, construct_col, skip_first=False):
# Create a DataFrame with the data (Exercise Type A and C are algorithm 1, B and D are algorithm 2. Gender M is visual 1, F is visual 2)
    print('\nconstruct index: ', construct_col)
    print(question_data[construct_col])
    data = pd.DataFrame({
        'Algo': ['B', 'B', 'B', 'B', 'B', 'B', 'A', 'A', 'A', 'A', 'B', 'B', 'B', 'A', 'A', 'A', 'A', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'A', 'A', 'B', 'B', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'B', 'A', 'A', 'A', 'A', 'B', 'A', 'A', 'A', 'A', 'A', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'A', 'A', 'A', 'A', 'B', 'B', 'B', 'B', 'A', 'A', 'B', 'B', 'B', 'A', 'A', 'B', 'B', 'A', 'A', 'A', 'A', 'A', 'A'],
        'Visual': ['M', 'M', 'F', 'F', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'F', 'F', 'F', 'F', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'F', 'F', 'M', 'M', 'F', 'F', 'F', 'F', 'F', 'M', 'M', 'F', 'F', 'F', 'F', 'M', 'F', 'F', 'F', 'M', 'F', 'F', 'F', 'F', 'M', 'M', 'F', 'F', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'F', 'F', 'M', 'M', 'F', 'F', 'F', 'F', 'F', 'F', 'M', 'F', 'F', 'M', 'M', 'F', 'F', 'M', 'M', 'F', 'F', 'M', 'M'],
        'Value': question_data[construct_col]
    })

    # Fit the ANOVA model
    model = ols('Value ~ Algo + Visual + Algo:Visual', data=data).fit()

    # Perform the ANOVA test
    anova_table = sm.stats.anova_lm(model, typ=2)

    # Print the ANOVA table
    print(anova_table)

def two_way_anova_for_nasatlx(question_data):
# Create a DataFrame with the data (Exercise Type A and C are algorithm 1, B and D are algorithm 2. Gender M is visual 1, F is visual 2)
    print('question data: ',question_data)
    data = pd.DataFrame({
        'Algo': ['B', 'B', 'B', 'B', 'B', 'B', 'A', 'A', 'A', 'A', 'B', 'B', 'B', 'A', 'A', 'A', 'A', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'A', 'A', 'B', 'B', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'B', 'A', 'A', 'A', 'A', 'B', 'A', 'A', 'A', 'A', 'A', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'A', 'A', 'A', 'A', 'B', 'B', 'B', 'B', 'A', 'A', 'B', 'B', 'B', 'A', 'A', 'B', 'B', 'A', 'A', 'A', 'A', 'A', 'A'],
        'Visual': ['M', 'M', 'F', 'F', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'F', 'F', 'F', 'F', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'F', 'F', 'M', 'M', 'F', 'F', 'F', 'F', 'F', 'M', 'M', 'F', 'F', 'F', 'F', 'M', 'F', 'F', 'F', 'M', 'F', 'F', 'F', 'F', 'M', 'M', 'F', 'F', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'F', 'F', 'M', 'M', 'F', 'F', 'F', 'F', 'F', 'F', 'M', 'F', 'F', 'M', 'M', 'F', 'F', 'M', 'M', 'F', 'F', 'M', 'M'],
        'Value': question_data
    })

    # Fit the ANOVA model
    model = ols('Value ~ Algo + Visual + Algo:Visual', data=data).fit()

    # Perform the ANOVA test
    anova_table = sm.stats.anova_lm(model, typ=2)

    # Print the ANOVA table
    print(anova_table)

def standardize_question_data(question_data):
    standardized_data = []
    for i in range(0, len(question_data)):
        curr_question = question_data[i]
        average = average = np.mean(curr_question)
        centered_numbers = curr_question - average

        # Calculate the standard deviation
        std_deviation = np.std(centered_numbers)

        # Divide each centered number by the standard deviation
        standardized_numbers = centered_numbers / std_deviation
        standardized_data.append(standardized_numbers.tolist())
        # print('\n',i,': ',standardized_numbers.tolist())

    return standardized_data

######################################################################################################################################
######################################################################################################################################
######################################################################################################################################

curr_question = 10
question_data = [['byy02', 3,3, 2, 2, 1, 3, 3, 1, 4, 3, 3, 1, 3, 4, 1, 2, 3, 3, 4, 4, 4, 3, 2, 2, 1], ['byy02', 3, 4, 1, 5, 3, 3, 4, 5, 3, 1, 3, 5, 4, 4, 1, 3, 4, 5, 4, 3, 4, 4, 3, 3, 2], ['bzy02', 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], ['bzy02', 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], ['byaa09', 4, 4, 5, 2, 4, 3, 4, 5, 4, 3, 4, 5, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 3], ['byaa09', 5, 4, 5, 4, 5, 4, 4, 5, 4, 4, 4, 5, 5, 4, 5, 5, 4, 5, 5, 1, 5, 4, 5, 4, 5], ['ayx03', 5, 5, 5, 5, 5, 4, 4, 5, 4, 5, 5, 5, 4, 4, 3, 4, 5, 5, 5, 5, 5, 4, 5, 5, 5], ['ayx03', 4, 5, 5, 4, 4, 4, 5, 5, 2, 5, 5, 5, 4, 5, 5, 5, 2, 5, 5, 1, 5, 5, 5, 4, 2], ['ays08', 3, 3, 3, 4, 2, 2, 4, 4, 3, 3, 3, 4, 3, 4, 4, 4, 1, 4, 2, 3, 4, 4, 4, 4, 3], ['ays08', 4, 4, 4, 5, 5, 5, 5, 5, 5, 4, 5, 5, 5, 5, 5, 4, 5, 5, 4, 5, 5, 5, 5, 4, 4], ['byu06', 4, 5, 5, 4, 4, 4, 5, 5, 4, 5, 5, 5, 4, 4, 5, 5, 4, 5, 5, 5, 5, 5, 4, 5, 4], ['bzw042', 2, 2, 4, 5, 2, 5, 4, 1, 3, 4, 3, 1, 2, 5, 5, 2, 2, 5, 2, 4, 3, 5, 5, 5, 2], ['bzw042', 2, 3, 4, 5, 2, 5, 2, 5, 5, 5, 5, 5, 2, 5, 5, 3, 2, 5, 3, 3, 3, 5, 3, 4, 2], ['azv052', 3, 4, 5, 4, 3, 3, 3, 5, 5, 5, 4, 5, 3, 3, 4, 3, 4, 5, 3, 1, 4, 2, 4, 4, 4], ['azv052', 3, 2, 5, 4, 2, 3, 4, 5, 5, 5, 4, 5, 3, 3, 3, 2, 2, 5, 3, 1, 4, 3, 5, 3, 2], ['ayv05', 4, 4, 4, 4, 5, 2, 4, 5, 4, 4, 4, 5, 4, 5, 5, 2, 4, 5, 4, 2, 4, 4, 5, 4, 5], ['ayv05', 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 1, 4, 2], ['byu06', 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 5, 5, 5, 5, 4, 5, 5], ['byw04', 5, 5, 5, 4, 4, 4, 5, 4, 3, 4, 4, 3, 5, 5, 4, 5, 4, 3, 5, 3, 4, 5, 5, 5, 4], ['byw04', 4, 5, 3, 4, 3, 4, 4, 5, 4, 5, 5, 5, 5, 5, 3, 5, 4, 5, 5, 3, 4, 5, 4, 5, 3], ['byt072', 2, 2, 1, 2, 1, 1, 1, 4, 2, 4, 2, 5, 3, 2, 5, 3, 2, 5, 2, 2, 2, 1, 3, 2, 1], ['byt072', 2, 1, 1, 1, 1, 1, 2, 4, 1, 4, 3, 5, 3, 3, 3, 4, 1, 3, 4, 3, 2, 2, 2, 4, 1], ['bzp11', 4, 5, 5, 4, 4, 5, 4, 4, 5, 4, 4, 5, 4, 3, 4, 5, 4, 5, 4, 1, 4, 3, 4, 3, 3], ['bzp11', 4, 3, 5, 2, 4, 2, 3, 5, 3, 5, 3, 5, 4, 4, 3, 4, 4, 5, 4, 4, 5, 4, 5, 4, 5], ['ayu06', 4, 5, 4, 5, 4, 5, 4, 5, 5, 4, 5, 4, 5, 5, 4, 5, 5, 4, 4, 4, 5, 5, 5, 5, 4], ['ayu06', 4, 4, 5, 4, 4, 4, 4, 4, 4, 4, 4, 5, 4, 5, 5, 5, 4, 5, 5, 5, 5, 4, 4, 5, 4], ['bzt07', 3, 4, 4, 3, 4, 4, 4, 5, 4, 4, 3, 5, 4, 4, 3, 3, 4, 3, 3, 1, 4, 4, 5, 3, 4], ['bzt07', 3, 4, 2, 2, 4, 4, 3, 4, 4, 4, 4, 5, 2, 5, 4, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4], ['azx03', 3, 3, 5, 3, 3, 4, 5, 1, 3, 5, 4, 5, 4, 4, 3, 2, 3, 5, 4, 1, 5, 5, 2, 3, 3], ['azo12', 4, 4, 4, 3, 5, 4, 4, 5, 4, 4, 4, 5, 4, 4, 5, 4, 4, 4, 4, 4, 4, 4, 5, 4, 4], ['azo12', 5, 4, 5, 4, 4, 4, 4, 5, 4, 4, 4, 5, 4, 4, 5, 4, 4, 5, 4, 4, 5, 4, 5, 4, 4], ['ayr09', 5, 5, 5, 4, 5, 4, 5, 5, 4, 3, 5, 5, 5, 5, 5, 5, 4, 5, 5, 5, 5, 5, 5, 5, 5], ['ayr09', 5, 5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 5, 4, 5, 5, 4, 5, 5, 5, 5, 5, 5, 5, 4], ['azq102', 5, 5, 2, 5, 4, 2, 4, 4, 3, 5, 4, 5, 4, 5, 3, 4, 2, 4, 4, 2, 4, 5, 5, 4, 2], ['azq102', 4, 4, 4, 2, 2, 3, 3, 4, 2, 3, 5, 5, 4, 4, 3, 4, 3, 4, 4, 2, 4, 4, 4, 4, 2], ['bzs08', 5, 5, 5, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 5, 5, 1, 5, 5], ['azx03', 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], ['ayo12', 4, 5, 5, 5, 5, 5, 4, 5, 4, 5, 5, 5, 5, 5, 4, 5, 4, 4, 5, 3, 5, 5, 5, 5, 5], ['azy02', 5, 4, 5, 4, 4, 5, 5, 5, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 4, 5, 5, 5, 5, 5, 5], ['azy02', 5, 4, 5, 5, 5, 3, 4, 5, 4, 5, 5, 4, 5, 5, 4, 5, 4, 5, 4, 5, 5, 5, 5, 5, 5], ['bzs08', 4, 4, 5, 4, 5, 4, 5, 3, 5, 4, 5, 4, 4, 4, 5, 5, 5, 5, 5, 2, 5, 5, 5, 5, 4], ['ayo12', 4, 4, 4, 3, 5, 4, 3, 5, 5, 5, 4, 5, 4, 3, 4, 4, 4, 5, 4, 2, 4, 4, 5, 4, 4], ['azt072', 2, 4, 3, 2, 3, 1, 1, 5, 1, 4, 5, 5, 3, 3, 5, 5, 3, 5, 3, 3, 4, 3, 5, 5, 3], ['azt07', 4, 3, 3, 2, 4, 2, 2, 5, 1, 2, 4, 5, 3, 2, 4, 4, 3, 4, 4, 2, 4, 1, 4, 4, 4], ['azu06', 3, 4, 2, 3, 2, 4, 4, 5, 4, 5, 3, 5, 4, 3, 2, 4, 3, 4, 5, 2, 5, 4, 2, 4, 4], ['azu06', 5, 4, 5, 4, 3, 2, 4, 4, 5, 3, 4, 4, 2, 4, 1, 5, 5, 3, 5, 2, 4, 5, 2, 5, 4], ['byv05', 3, 3, 4, 2, 2, 2, 4, 5, 4, 4, 3, 5, 3, 4, 4, 3, 4, 3, 5, 4, 4, 1, 4, 5, 3], ['byv05', 4, 4, 5, 2, 3, 3, 4, 5, 3, 4, 3, 5, 4, 3, 5, 4, 2, 4, 4, 2, 3, 2, 4, 4, 4], ['bzn134', 4, 5, 4, 4, 5, 4, 5, 1, 4, 4, 4, 1, 4, 4, 4, 4, 3, 4, 5, 5, 4, 4, 3, 4, 4], ['bzn134', 4, 4, 5, 4, 5, 4, 4, 5, 4, 5, 4, 5, 5, 4, 4, 5, 3, 5, 4, 2, 4, 4, 5, 4, 4], ['bys08', 4, 5, 5, 5, 4, 4, 4, 5, 5, 4, 5, 5, 4, 5, 5, 4, 4, 5, 5, 5, 5, 4, 5, 5, 4], ['bys08', 4, 5, 5, 4, 4, 4, 4, 5, 4, 5, 5, 5, 4, 5, 4, 4, 4, 4, 4, 2, 5, 4, 4, 5, 3], ['byx03', 5, 5, 4, 2, 2, 3, 4, 4, 2, 3, 3, 5, 4, 2, 4, 4, 3, 3, 5, 3, 2, 2, 5, 5, 1], ['byx03', 4, 4, 3, 1, 1, 2, 4, 5, 2, 3, 4, 5, 3, 2, 4, 4, 2, 3, 4, 3, 3, 1, 5, 5, 1], ['byz01', 4, 5, 5, 5, 4, 5, 5, 5, 5, 4, 5, 5, 5, 5, 5, 5, 4, 5, 5, 2, 5, 5, 5, 5, 5], ['byo12', 4, 5, 5, 5, 4, 5, 5, 5, 4, 5, 4, 5, 5, 5, 4, 5, 3, 5, 5, 1, 5, 4, 5, 5, 4], ['byo12', 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 4, 4, 3, 4, 3, 4, 4, 4, 3, 3, 3, 4, 4, 3], ['azw04', 5, 5, 5, 5, 5, 4, 5, 4, 5, 4, 5, 3, 5, 5, 3, 5, 5, 3, 5, 3, 5, 5, 3, 5, 5], ['azw04', 5, 5, 5, 5, 5, 5, 5, 3, 5, 2, 5, 4, 5, 4, 4, 4, 5, 5, 5, 1, 5, 5, 3, 5, 5], ['ayw04', 5, 5, 5, 5, 5, 5, 5, 3, 4, 3, 5, 5, 5, 5, 3, 5, 5, 3, 5, 1, 5, 5, 5, 5, 4], ['ayw04', 5, 5, 5, 5, 5, 5, 4, 2, 4, 3, 4, 3, 5, 5, 4, 4, 3, 5, 5, 2, 5, 5, 4, 5, 4], ['bzr09', 4, 4, 4, 4, 4, 4, 4, 5, 4, 4, 4, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], ['bzo122', 4, 4, 3, 4, 4, 3, 4, 4, 4, 4, 4, 5, 4, 3, 4, 5, 4, 3, 4, 2, 4, 4, 5, 4, 5], ['bzo122', 4, 5, 4, 3, 4, 5, 5, 5, 5, 4, 5, 5, 4, 5, 2, 5, 3, 5, 4, 2, 5, 5, 5, 5, 4], ['bzr09', 4, 4, 5, 4, 5, 4, 4, 4, 4, 4, 5, 4, 4, 5, 5, 4, 5, 4, 4, 5, 4, 4, 5, 4, 5], ['azr09', 4, 4, 4, 4, 4, 4, 4, 3, 4, 4, 4, 3, 4, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], ['azr09', 4, 4, 4, 3, 3, 4, 4, 5, 3, 4, 4, 5, 5, 3, 4, 4, 4, 5, 5, 2, 4, 3, 4, 3, 3], ['byz01', 3, 4, 4, 3, 3, 3, 4, 5, 3, 4, 4, 5, 3, 4, 3, 3, 4, 4, 4, 2, 4, 4, 5, 3, 3], ['bzz014', 4, 4, 4, 4, 4, 5, 4, 5, 4, 4, 4, 4, 4, 5, 3, 4, 4, 3, 4, 4, 4, 4, 4, 4, 4], ['bzz014', 4, 5, 5, 4, 4, 4, 5, 5, 4, 4, 4, 5, 4, 4, 4, 4, 4, 4, 4, 3, 4, 4, 5, 4, 4], ['ayt07', 4, 4, 5, 2, 4, 2, 4, 5, 3, 5, 5, 5, 4, 3, 4, 5, 4, 5, 4, 5, 4, 3, 5, 4, 5], ['ayt07', 5, 5, 5, 2, 3, 3, 3, 5, 3, 5, 5, 5, 5, 3, 5, 5, 5, 5, 4, 5, 5, 3, 5, 3, 5], ['bzx03', 4, 2, 4, 1, 4, 1, 4, 1, 5, 2, 4, 5, 5, 3, 3, 5, 5, 5, 5, 3, 5, 1, 5, 5, 3], ['bzx03', 3, 3, 3, 3, 5, 3, 3, 3, 3, 5, 3, 5, 3, 3, 2, 5, 3, 3, 5, 3, 3, 3, 2, 4, 2], ['ayp11', 4, 4, 4, 3, 4, 4, 5, 4, 4, 4, 4, 4, 5, 4, 5, 4, 4, 4, 4, 1, 4, 5, 5, 4, 5], ['ayp11', 4, 5, 4, 4, 5, 4, 4, 5, 4, 4, 5, 4, 5, 4, 4, 5, 4, 4, 5, 4, 5, 4, 5, 4, 5], ['azp114', 3, 3, 1, 2, 2, 2, 2, 4, 2, 3, 3, 3, 2, 2, 3, 3, 3, 4, 5, 4, 2, 2, 5, 3, 4], ['azp114', 4, 4, 4, 3, 4, 4, 5, 3, 3, 5, 5, 5, 5, 3, 4, 5, 2, 4, 4, 2, 4, 2, 3, 5, 4], ['ayq10', 4, 4, 5, 5, 5, 5, 5, 3, 4, 5, 5, 4, 5, 5, 5, 4, 4, 4, 4, 4, 5, 5, 4, 4, 5], ['ayq10', 4, 4, 3, 5, 4, 5, 4, 3, 5, 5, 5, 5, 4, 5, 4, 5, 4, 4, 4, 1, 5, 5, 4, 4, 5]]

q8 = values_per_question(question_data, 8)
q12 = values_per_question(question_data, 12)
q15 = values_per_question(question_data, 15)
q18 = values_per_question(question_data, 18)
q20 = values_per_question(question_data, 20)

data_nasatlx = [q8,q12,q15,q18,q20]
# print('q8: ', data_nasatlx[0])
data_nasatlx = standardize_question_data(data_nasatlx)
# print('q8: ', data_nasatlx[0])

# investigate_all_questions(data_nasatlx)

print('mentally demanding')
print(values_per_question(question_data, 8))
mentally = values_per_question(question_data, 8)
print('physically demanding')
print(values_per_question(question_data, 12))
physically = values_per_question(question_data, 12)
print('how rushed was tempo')
print(values_per_question(question_data, 15))
tempo = values_per_question(question_data, 15)
print('how hard did you have to work')
print(values_per_question(question_data, 18))
work = values_per_question(question_data, 18)
print('how successful were you')
print(values_per_question(question_data, 20))
success = values_per_question(question_data, 20)
print('how insecure were you')
print(values_per_question(question_data, 23))
insecure = values_per_question(question_data, 23)

nasa_tlx_answers = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0]
print('lengte: ', len(nasa_tlx_answers))
for i in range(80):
    nasa_tlx_answers[i] = mentally[i] + physically[i] + tempo[i] + work[i] + success[i] + insecure[i]
    nasa_tlx_answers[i] = nasa_tlx_answers[i]/6

# nasa_tlx_answers = zip(mentally, physically, tempo, work, success, insecure)

print(nasa_tlx_answers)
print('length: ', len(nasa_tlx_answers))

two_way_anova_for_nasatlx(nasa_tlx_answers)

