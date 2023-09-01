import pandas as pd
import statsmodels.api as sm
import numpy as np
from statsmodels.formula.api import ols
from statsmodels.stats.multicomp import pairwise_tukeyhsd

def average_per_question(question_data, question_col):
    # calculate the average for the given question
    values = values_per_question(question_data, question_col)
    print('values: ', values)
    sum = 0
    for i in range(0, len(values)):
        sum += values[i]
    return sum/len(values)

def std_dev_per_question(question_data, question_col):
    # calculate the standard deviation for the given question
    values = values_per_question(question_data, question_col)
    return np.std(values).round(2)

def total_average(averages):
    # calculate the total average of all averages
    sum = 0
    for i in range(0, len(averages)):
        sum += averages[i]
    return sum/len(averages)

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


# def two_way_anova(question_data, question_col, skip_first=True):
# # Create a DataFrame with the data (Exercise Type A and C are algorithm 1, B and D are algorithm 2. Gender M is visual 1, F is visual 2)
#     print('len question data: ', len(question_data))
#     print('question col: ', question_col)
#     print('valuesperquestion: ', values_per_question(question_data, question_col, skip_first))
#     print('len(valuesperquestion): ', len(values_per_question(question_data, question_col)))
#     data = pd.DataFrame({
#         'Algo': ['B', 'B', 'B', 'B', 'B', 'B', 'A', 'A', 'A', 'A', 'B', 'B', 'B', 'A', 'A', 'A', 'A', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'A', 'A', 'B', 'B', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'B', 'A', 'A', 'A', 'A', 'B', 'A', 'A', 'A', 'A', 'A', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'A', 'A', 'A', 'A', 'B', 'B', 'B', 'B', 'A', 'A', 'B', 'B', 'B', 'A', 'A', 'B', 'B', 'A', 'A', 'A', 'A', 'A', 'A'],
#         'Visual': ['M', 'M', 'F', 'F', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'F', 'F', 'F', 'F', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'F', 'F', 'M', 'M', 'F', 'F', 'F', 'F', 'F', 'M', 'M', 'F', 'F', 'F', 'F', 'M', 'F', 'F', 'F', 'M', 'F', 'F', 'F', 'F', 'M', 'M', 'F', 'F', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'F', 'F', 'M', 'M', 'F', 'F', 'F', 'F', 'F', 'F', 'M', 'F', 'F', 'M', 'M', 'F', 'F', 'M', 'M', 'F', 'F', 'M', 'M'],
#         'Value': values_per_question(question_data, question_col)
#     })

#     # Fit the ANOVA model
#     model = ols('Value ~ Algo + Visual + Algo:Visual', data=data).fit()

#     # Perform the ANOVA test
#     anova_table = sm.stats.anova_lm(model, typ=2)

#     # Print the ANOVA table
#     print(anova_table)

# def investigate_all_questions(question_data, skip_first=True):
#     for i in range(1, len(question_data[0])):
#         print("Question " + str(i) + ":")
#         print("Average: " + str(average_per_question(question_data, i)))
#         print("Standard deviation: " + str(std_dev_per_question(question_data, i)))
#         print("ANOVA:")
#         two_way_anova(question_data, i, skip_first)
#         print("")

def multiply_list_val(list, value):
    new_list = []
    for i in list:
        new_list.append(i * value)
    return new_list

def investigate_all_constructs(construct_data, skip_first=False):
    for i in range(len(construct_data)):
        print("\n\n\nConstruct " + str(i) + ":")
        # print("Average: " + str(average_per_question(construct_data, i)))
        # print("Standard deviation: " + str(std_dev_per_question(construct_data, i)))
        print("ANOVA:")
        two_way_anova_for_construct(construct_data, i, skip_first)
        print("")

def two_way_anova_for_construct(question_data_constructs, construct_col, skip_first=False):
# Create a DataFrame with the data (M is pre-filtering, F is post-filtering. M is visual 1, F is visual 2)
    print('\nconstruct index: ', construct_col)
    print(question_data_constructs[construct_col])
    data = pd.DataFrame({
        'Algo': ['Pre', 'Pre', 'Post', 'Post', 'Pre', 'Pre', 'Pre', 'Pre', 'Pre', 'Pre', 'Pre', 'Post', 'Post', 'Post', 'Post', 'Pre', 'Pre', 'Pre', 'Pre', 'Pre', 'Pre', 'Pre', 'Post', 'Post', 'Pre', 'Pre', 'Post', 'Post', 'Post', 'Post', 'Post', 'Pre', 'Pre', 'Post', 'Post', 'Post', 'Post', 'Pre', 'Post', 'Post', 'Post', 'Pre', 'Post', 'Post', 'Post', 'Post', 'Pre', 'Pre', 'Post', 'Post', 'Pre', 'Pre', 'Pre', 'Pre', 'Pre', 'Pre', 'Pre', 'Post', 'Post', 'Pre', 'Pre', 'Post', 'Post', 'Post', 'Post', 'Post', 'Post', 'Pre', 'Post', 'Post', 'Pre', 'Pre', 'Post', 'Post', 'Pre', 'Pre', 'Post', 'Post', 'Pre', 'Pre'],
        'Visual': ['User', 'User', 'User', 'User', 'User', 'User', 'Content', 'Content', 'Content', 'Content', 'User', 'User', 'User', 'Content', 'Content', 'Content', 'Content', 'User', 'User', 'User', 'User', 'User', 'User', 'User', 'Content', 'Content', 'User', 'User', 'Content', 'Content', 'Content', 'Content', 'Content', 'Content', 'Content', 'User', 'Content', 'Content', 'Content', 'Content', 'User', 'Content', 'Content', 'Content', 'Content', 'Content', 'User', 'User', 'User', 'User', 'User', 'User', 'User', 'User', 'User', 'User', 'User', 'Content', 'Content', 'Content', 'Content', 'User', 'User', 'User', 'User', 'Content', 'Content', 'User', 'User', 'User', 'Content', 'Content', 'User', 'User', 'Content', 'Content', 'Content', 'Content', 'Content', 'Content'],
        'Value': question_data_constructs[construct_col]
    })

    # Fit the ANOVA model
    model = ols('Value ~ Algo + Visual + Algo:Visual', data=data).fit()

    # Perform the ANOVA test
    anova_table = sm.stats.anova_lm(model, typ=2)

    # Print the ANOVA table
    print(anova_table)

    # Perform the Tukey's HSD test
    tukey(question_data_constructs, construct_col)


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


def tukey (question_data_constructs, construct_col):

    # print('\nconstruct index: ', construct_col)
    # print(question_data_constructs[construct_col])
    data = pd.DataFrame({
        'Group': ['PreUser', 'PreUser', 'PostUser', 'PostUser', 'PreUser', 'PreUser', 'PreContent', 'PreContent', 'PreContent', 'PreContent', 'PreUser', 'PostUser', 'PostUser', 'PostContent', 'PostContent', 'PreContent', 'PreContent', 'PreUser', 'PreUser', 'PreUser', 'PreUser', 'PreUser', 'PostUser', 'PostUser', 'PreContent', 'PreContent', 'PostUser', 'PostUser', 'PostContent', 'PostContent', 'PostContent', 'PreContent', 'PreContent', 'PostContent', 'PostContent', 'PostUser', 'PostContent', 'PreContent', 'PostContent', 'PostContent', 'PostUser', 'PreContent', 'PostContent', 'PostContent', 'PostContent', 'PostContent', 'PreUser', 'PreUser', 'PostUser', 'PostUser', 'PreUser', 'PreUser', 'PreUser', 'PreUser', 'PreUser', 'PreUser', 'PreUser', 'PostContent', 'PostContent', 'PreContent', 'PreContent', 'PostUser', 'PostUser', 'PostUser', 'PostUser', 'PostContent', 'PostContent', 'PreUser', 'PostUser', 'PostUser', 'PreContent', 'PreContent', 'PostUser', 'PostUser', 'PreContent', 'PreContent', 'PostContent', 'PostContent', 'PreContent', 'PreContent'],
        'Algo': ['Pre', 'Pre', 'Post', 'Post', 'Pre', 'Pre', 'Pre', 'Pre', 'Pre', 'Pre', 'Pre', 'Post', 'Post', 'Post', 'Post', 'Pre', 'Pre', 'Pre', 'Pre', 'Pre', 'Pre', 'Pre', 'Post', 'Post', 'Pre', 'Pre', 'Post', 'Post', 'Post', 'Post', 'Post', 'Pre', 'Pre', 'Post', 'Post', 'Post', 'Post', 'Pre', 'Post', 'Post', 'Post', 'Pre', 'Post', 'Post', 'Post', 'Post', 'Pre', 'Pre', 'Post', 'Post', 'Pre', 'Pre', 'Pre', 'Pre', 'Pre', 'Pre', 'Pre', 'Post', 'Post', 'Pre', 'Pre', 'Post', 'Post', 'Post', 'Post', 'Post', 'Post', 'Pre', 'Post', 'Post', 'Pre', 'Pre', 'Post', 'Post', 'Pre', 'Pre', 'Post', 'Post', 'Pre', 'Pre'],
        'Visual': ['User', 'User', 'User', 'User', 'User', 'User', 'Content', 'Content', 'Content', 'Content', 'User', 'User', 'User', 'Content', 'Content', 'Content', 'Content', 'User', 'User', 'User', 'User', 'User', 'User', 'User', 'Content', 'Content', 'User', 'User', 'Content', 'Content', 'Content', 'Content', 'Content', 'Content', 'Content', 'User', 'Content', 'Content', 'Content', 'Content', 'User', 'Content', 'Content', 'Content', 'Content', 'Content', 'User', 'User', 'User', 'User', 'User', 'User', 'User', 'User', 'User', 'User', 'User', 'Content', 'Content', 'Content', 'Content', 'User', 'User', 'User', 'User', 'Content', 'Content', 'User', 'User', 'User', 'Content', 'Content', 'User', 'User', 'Content', 'Content', 'Content', 'Content', 'Content', 'Content'],
        'Value': question_data_constructs[construct_col]
    })
    # print('data[Value]: ',data['Value'])
    # print('data[Algo]: ',data['Algo'])
    tukey_result = pairwise_tukeyhsd(endog=data['Value'], groups=data['Group'])
    print('tukey result:\n' + str(tukey_result))






######################################################################################################################################
######################################################################################################################################
######################################################################################################################################

curr_question = 10
question_data = [['byy02', 3,3, 2, 2, 1, 3, 3, 1, 4, 3, 3, 1, 3, 4, 1, 2, 3, 3, 4, 4, 4, 3, 2, 2, 1], ['byy02', 3, 4, 1, 5, 3, 3, 4, 5, 3, 1, 3, 5, 4, 4, 1, 3, 4, 5, 4, 3, 4, 4, 3, 3, 2], ['bzy02', 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], ['bzy02', 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], ['byaa09', 4, 4, 5, 2, 4, 3, 4, 5, 4, 3, 4, 5, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 3], ['byaa09', 5, 4, 5, 4, 5, 4, 4, 5, 4, 4, 4, 5, 5, 4, 5, 5, 4, 5, 5, 1, 5, 4, 5, 4, 5], ['ayx03', 5, 5, 5, 5, 5, 4, 4, 5, 4, 5, 5, 5, 4, 4, 3, 4, 5, 5, 5, 5, 5, 4, 5, 5, 5], ['ayx03', 4, 5, 5, 4, 4, 4, 5, 5, 2, 5, 5, 5, 4, 5, 5, 5, 2, 5, 5, 1, 5, 5, 5, 4, 2], ['ays08', 3, 3, 3, 4, 2, 2, 4, 4, 3, 3, 3, 4, 3, 4, 4, 4, 1, 4, 2, 3, 4, 4, 4, 4, 3], ['ays08', 4, 4, 4, 5, 5, 5, 5, 5, 5, 4, 5, 5, 5, 5, 5, 4, 5, 5, 4, 5, 5, 5, 5, 4, 4], ['byu06', 4, 5, 5, 4, 4, 4, 5, 5, 4, 5, 5, 5, 4, 4, 5, 5, 4, 5, 5, 5, 5, 5, 4, 5, 4], ['bzw042', 2, 2, 4, 5, 2, 5, 4, 1, 3, 4, 3, 1, 2, 5, 5, 2, 2, 5, 2, 4, 3, 5, 5, 5, 2], ['bzw042', 2, 3, 4, 5, 2, 5, 2, 5, 5, 5, 5, 5, 2, 5, 5, 3, 2, 5, 3, 3, 3, 5, 3, 4, 2], ['azv052', 3, 4, 5, 4, 3, 3, 3, 5, 5, 5, 4, 5, 3, 3, 4, 3, 4, 5, 3, 1, 4, 2, 4, 4, 4], ['azv052', 3, 2, 5, 4, 2, 3, 4, 5, 5, 5, 4, 5, 3, 3, 3, 2, 2, 5, 3, 1, 4, 3, 5, 3, 2], ['ayv05', 4, 4, 4, 4, 5, 2, 4, 5, 4, 4, 4, 5, 4, 5, 5, 2, 4, 5, 4, 2, 4, 4, 5, 4, 5], ['ayv05', 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 1, 4, 2], ['byu06', 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 5, 5, 5, 5, 4, 5, 5], ['byw04', 5, 5, 5, 4, 4, 4, 5, 4, 3, 4, 4, 3, 5, 5, 4, 5, 4, 3, 5, 3, 4, 5, 5, 5, 4], ['byw04', 4, 5, 3, 4, 3, 4, 4, 5, 4, 5, 5, 5, 5, 5, 3, 5, 4, 5, 5, 3, 4, 5, 4, 5, 3], ['byt072', 2, 2, 1, 2, 1, 1, 1, 4, 2, 4, 2, 5, 3, 2, 5, 3, 2, 5, 2, 2, 2, 1, 3, 2, 1], ['byt072', 2, 1, 1, 1, 1, 1, 2, 4, 1, 4, 3, 5, 3, 3, 3, 4, 1, 3, 4, 3, 2, 2, 2, 4, 1], ['bzp11', 4, 5, 5, 4, 4, 5, 4, 4, 5, 4, 4, 5, 4, 3, 4, 5, 4, 5, 4, 1, 4, 3, 4, 3, 3], ['bzp11', 4, 3, 5, 2, 4, 2, 3, 5, 3, 5, 3, 5, 4, 4, 3, 4, 4, 5, 4, 4, 5, 4, 5, 4, 5], ['ayu06', 4, 5, 4, 5, 4, 5, 4, 5, 5, 4, 5, 4, 5, 5, 4, 5, 5, 4, 4, 4, 5, 5, 5, 5, 4], ['ayu06', 4, 4, 5, 4, 4, 4, 4, 4, 4, 4, 4, 5, 4, 5, 5, 5, 4, 5, 5, 5, 5, 4, 4, 5, 4], ['bzt07', 3, 4, 4, 3, 4, 4, 4, 5, 4, 4, 3, 5, 4, 4, 3, 3, 4, 3, 3, 1, 4, 4, 5, 3, 4], ['bzt07', 3, 4, 2, 2, 4, 4, 3, 4, 4, 4, 4, 5, 2, 5, 4, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4], ['azx03', 3, 3, 5, 3, 3, 4, 5, 1, 3, 5, 4, 5, 4, 4, 3, 2, 3, 5, 4, 1, 5, 5, 2, 3, 3], ['azo12', 4, 4, 4, 3, 5, 4, 4, 5, 4, 4, 4, 5, 4, 4, 5, 4, 4, 4, 4, 4, 4, 4, 5, 4, 4], ['azo12', 5, 4, 5, 4, 4, 4, 4, 5, 4, 4, 4, 5, 4, 4, 5, 4, 4, 5, 4, 4, 5, 4, 5, 4, 4], ['ayr09', 5, 5, 5, 4, 5, 4, 5, 5, 4, 3, 5, 5, 5, 5, 5, 5, 4, 5, 5, 5, 5, 5, 5, 5, 5], ['ayr09', 5, 5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 5, 4, 5, 5, 4, 5, 5, 5, 5, 5, 5, 5, 4], ['azq102', 5, 5, 2, 5, 4, 2, 4, 4, 3, 5, 4, 5, 4, 5, 3, 4, 2, 4, 4, 2, 4, 5, 5, 4, 2], ['azq102', 4, 4, 4, 2, 2, 3, 3, 4, 2, 3, 5, 5, 4, 4, 3, 4, 3, 4, 4, 2, 4, 4, 4, 4, 2], ['bzs08', 5, 5, 5, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 5, 5, 1, 5, 5], ['azx03', 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], ['ayo12', 4, 5, 5, 5, 5, 5, 4, 5, 4, 5, 5, 5, 5, 5, 4, 5, 4, 4, 5, 3, 5, 5, 5, 5, 5], ['azy02', 5, 4, 5, 4, 4, 5, 5, 5, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 4, 5, 5, 5, 5, 5, 5], ['azy02', 5, 4, 5, 5, 5, 3, 4, 5, 4, 5, 5, 4, 5, 5, 4, 5, 4, 5, 4, 5, 5, 5, 5, 5, 5], ['bzs08', 4, 4, 5, 4, 5, 4, 5, 3, 5, 4, 5, 4, 4, 4, 5, 5, 5, 5, 5, 2, 5, 5, 5, 5, 4], ['ayo12', 4, 4, 4, 3, 5, 4, 3, 5, 5, 5, 4, 5, 4, 3, 4, 4, 4, 5, 4, 2, 4, 4, 5, 4, 4], ['azt072', 2, 4, 3, 2, 3, 1, 1, 5, 1, 4, 5, 5, 3, 3, 5, 5, 3, 5, 3, 3, 4, 3, 5, 5, 3], ['azt07', 4, 3, 3, 2, 4, 2, 2, 5, 1, 2, 4, 5, 3, 2, 4, 4, 3, 4, 4, 2, 4, 1, 4, 4, 4], ['azu06', 3, 4, 2, 3, 2, 4, 4, 5, 4, 5, 3, 5, 4, 3, 2, 4, 3, 4, 5, 2, 5, 4, 2, 4, 4], ['azu06', 5, 4, 5, 4, 3, 2, 4, 4, 5, 3, 4, 4, 2, 4, 1, 5, 5, 3, 5, 2, 4, 5, 2, 5, 4], ['byv05', 3, 3, 4, 2, 2, 2, 4, 5, 4, 4, 3, 5, 3, 4, 4, 3, 4, 3, 5, 4, 4, 1, 4, 5, 3], ['byv05', 4, 4, 5, 2, 3, 3, 4, 5, 3, 4, 3, 5, 4, 3, 5, 4, 2, 4, 4, 2, 3, 2, 4, 4, 4], ['bzn134', 4, 5, 4, 4, 5, 4, 5, 1, 4, 4, 4, 1, 4, 4, 4, 4, 3, 4, 5, 5, 4, 4, 3, 4, 4], ['bzn134', 4, 4, 5, 4, 5, 4, 4, 5, 4, 5, 4, 5, 5, 4, 4, 5, 3, 5, 4, 2, 4, 4, 5, 4, 4], ['bys08', 4, 5, 5, 5, 4, 4, 4, 5, 5, 4, 5, 5, 4, 5, 5, 4, 4, 5, 5, 5, 5, 4, 5, 5, 4], ['bys08', 4, 5, 5, 4, 4, 4, 4, 5, 4, 5, 5, 5, 4, 5, 4, 4, 4, 4, 4, 2, 5, 4, 4, 5, 3], ['byx03', 5, 5, 4, 2, 2, 3, 4, 4, 2, 3, 3, 5, 4, 2, 4, 4, 3, 3, 5, 3, 2, 2, 5, 5, 1], ['byx03', 4, 4, 3, 1, 1, 2, 4, 5, 2, 3, 4, 5, 3, 2, 4, 4, 2, 3, 4, 3, 3, 1, 5, 5, 1], ['byz01', 4, 5, 5, 5, 4, 5, 5, 5, 5, 4, 5, 5, 5, 5, 5, 5, 4, 5, 5, 2, 5, 5, 5, 5, 5], ['byo12', 4, 5, 5, 5, 4, 5, 5, 5, 4, 5, 4, 5, 5, 5, 4, 5, 3, 5, 5, 1, 5, 4, 5, 5, 4], ['byo12', 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 4, 4, 3, 4, 3, 4, 4, 4, 3, 3, 3, 4, 4, 3], ['azw04', 5, 5, 5, 5, 5, 4, 5, 4, 5, 4, 5, 3, 5, 5, 3, 5, 5, 3, 5, 3, 5, 5, 3, 5, 5], ['azw04', 5, 5, 5, 5, 5, 5, 5, 3, 5, 2, 5, 4, 5, 4, 4, 4, 5, 5, 5, 1, 5, 5, 3, 5, 5], ['ayw04', 5, 5, 5, 5, 5, 5, 5, 3, 4, 3, 5, 5, 5, 5, 3, 5, 5, 3, 5, 1, 5, 5, 5, 5, 4], ['ayw04', 5, 5, 5, 5, 5, 5, 4, 2, 4, 3, 4, 3, 5, 5, 4, 4, 3, 5, 5, 2, 5, 5, 4, 5, 4], ['bzr09', 4, 4, 4, 4, 4, 4, 4, 5, 4, 4, 4, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], ['bzo122', 4, 4, 3, 4, 4, 3, 4, 4, 4, 4, 4, 5, 4, 3, 4, 5, 4, 3, 4, 2, 4, 4, 5, 4, 5], ['bzo122', 4, 5, 4, 3, 4, 5, 5, 5, 5, 4, 5, 5, 4, 5, 2, 5, 3, 5, 4, 2, 5, 5, 5, 5, 4], ['bzr09', 4, 4, 5, 4, 5, 4, 4, 4, 4, 4, 5, 4, 4, 5, 5, 4, 5, 4, 4, 5, 4, 4, 5, 4, 5], ['azr09', 4, 4, 4, 4, 4, 4, 4, 3, 4, 4, 4, 3, 4, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], ['azr09', 4, 4, 4, 3, 3, 4, 4, 5, 3, 4, 4, 5, 5, 3, 4, 4, 4, 5, 5, 2, 4, 3, 4, 3, 3], ['byz01', 3, 4, 4, 3, 3, 3, 4, 5, 3, 4, 4, 5, 3, 4, 3, 3, 4, 4, 4, 2, 4, 4, 5, 3, 3], ['bzz014', 4, 4, 4, 4, 4, 5, 4, 5, 4, 4, 4, 4, 4, 5, 3, 4, 4, 3, 4, 4, 4, 4, 4, 4, 4], ['bzz014', 4, 5, 5, 4, 4, 4, 5, 5, 4, 4, 4, 5, 4, 4, 4, 4, 4, 4, 4, 3, 4, 4, 5, 4, 4], ['ayt07', 4, 4, 5, 2, 4, 2, 4, 5, 3, 5, 5, 5, 4, 3, 4, 5, 4, 5, 4, 5, 4, 3, 5, 4, 5], ['ayt07', 5, 5, 5, 2, 3, 3, 3, 5, 3, 5, 5, 5, 5, 3, 5, 5, 5, 5, 4, 5, 5, 3, 5, 3, 5], ['bzx03', 4, 2, 4, 1, 4, 1, 4, 1, 5, 2, 4, 5, 5, 3, 3, 5, 5, 5, 5, 3, 5, 1, 5, 5, 3], ['bzx03', 3, 3, 3, 3, 5, 3, 3, 3, 3, 5, 3, 5, 3, 3, 2, 5, 3, 3, 5, 3, 3, 3, 2, 4, 2], ['ayp11', 4, 4, 4, 3, 4, 4, 5, 4, 4, 4, 4, 4, 5, 4, 5, 4, 4, 4, 4, 1, 4, 5, 5, 4, 5], ['ayp11', 4, 5, 4, 4, 5, 4, 4, 5, 4, 4, 5, 4, 5, 4, 4, 5, 4, 4, 5, 4, 5, 4, 5, 4, 5], ['azp114', 3, 3, 1, 2, 2, 2, 2, 4, 2, 3, 3, 3, 2, 2, 3, 3, 3, 4, 5, 4, 2, 2, 5, 3, 4], ['azp114', 4, 4, 4, 3, 4, 4, 5, 3, 3, 5, 5, 5, 5, 3, 4, 5, 2, 4, 4, 2, 4, 2, 3, 5, 4], ['ayq10', 4, 4, 5, 5, 5, 5, 5, 3, 4, 5, 5, 4, 5, 5, 5, 4, 4, 4, 4, 4, 5, 5, 4, 4, 5], ['ayq10', 4, 4, 3, 5, 4, 5, 4, 3, 5, 5, 5, 5, 4, 5, 4, 5, 4, 4, 4, 1, 5, 5, 4, 4, 5]]
# most interesting questions: 3,4,5,9,11,13,,17,21,22
# below 0.05 for question 9, 

# print('current question: ', curr_question)
# print('values for this question: ',values_per_question(question_data, curr_question))
# print('average: ', average_per_question(question_data, curr_question))
# print('standard deviation: ', std_dev_per_question(question_data, curr_question))
# print('two way anova results: ', two_way_anova(question_data, curr_question))

# investigate_all_questions(question_data)
# for i in range(len(question_data[0])):
#     print('i: ', i)
#     print(values_per_question(question_data, i))


print('first, get all 25 questions from raw question_data list')
q1 = values_per_question(question_data, 1)
q2 = values_per_question(question_data, 2)
q3 = values_per_question(question_data, 3)
q4 = values_per_question(question_data, 4)
q5 = values_per_question(question_data, 5)
q6 = values_per_question(question_data, 6)
q7 = values_per_question(question_data, 7)
q8 = values_per_question(question_data, 8)
q9 = values_per_question(question_data, 9)
q10 = values_per_question(question_data, 10)
q11 = values_per_question(question_data, 11)
q12 = values_per_question(question_data, 12)
q13 = values_per_question(question_data, 13)
q14 = values_per_question(question_data, 14)
q15 = values_per_question(question_data, 15)
q16 = values_per_question(question_data, 16)
q17 = values_per_question(question_data, 17)
q18 = values_per_question(question_data, 18)
q19 = values_per_question(question_data, 19)
q20 = values_per_question(question_data, 20)
q21 = values_per_question(question_data, 21)
q22 = values_per_question(question_data, 22)
q23 = values_per_question(question_data, 23)
q24 = values_per_question(question_data, 24)
q25 = values_per_question(question_data, 25)
print('q1: ', q1)
print('standardize all questions')
data_per_question = [q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,q11,q12,q13,q14,q15,q16,q17,q18,q19,q20,q21,q22,q23,q24,q25]
standardized_questions = standardize_question_data(data_per_question)
print('standardized_question[1-1]: ', standardized_questions[0])

print('make question data constructs (easy of use, behavioral intentions, explanation, perc_accuracy, perc_fairness)')
ease_of_use = multiply_list_val(standardized_questions[3-1],1.129)
behavioral_intentions = np.add(multiply_list_val(standardized_questions[5-1],1.056), 
                               multiply_list_val(standardized_questions[25-1],0.948)).tolist()
explanation = np.add(
    np.add(multiply_list_val(standardized_questions[4-1],0.959),multiply_list_val(standardized_questions[6-1],0.982))
    ,multiply_list_val(standardized_questions[9-1],0.743)).tolist()
perc_accuracy = np.add(multiply_list_val(standardized_questions[1-1],0.740),multiply_list_val(standardized_questions[13-1],0.714)).tolist()
perc_fairness = np.add(multiply_list_val(standardized_questions[2-1],0.784),multiply_list_val(standardized_questions[11-1],0.586)).tolist()

question_data_constructs = [ease_of_use, behavioral_intentions, explanation, perc_accuracy, perc_fairness]
print('ease of use = question_data_constructs[0]: ', question_data_constructs[0])

# print('question_data_constructs: ', question_data_constructs)
print('len question_data_constructs: ', len(question_data_constructs))
print('len question_data_constructs[0]: ', len(question_data_constructs[0]))
print('construct 0 = ease of use')
print('construct 1 = behavioral intentions')
print('construct 2 = explanation')
print('construct 3 = perc_accuracy')
print('construct 4 = perc_fairness')

# first investigate all questions took listA of listsB with listB is for 1 person all answers to all questions
# now we have listA of listsB with listB is for 1 question all answers to all persons
print('\n investigate all constructs...')
investigate_all_constructs(question_data_constructs, skip_first=False)

# averages = []
# for i in range(1,26):
#     print('i: ', i)
#     averages.append(average_per_question(question_data, i))
# print('averages: ', averages)
# a = total_average(averages)
# print('total average: ', a)
