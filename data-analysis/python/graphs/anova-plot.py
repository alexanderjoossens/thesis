import numpy as np
import matplotlib.pyplot as plt
plt.style.use('seaborn')

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


# aluminum = np.array([6.4e-5 , 3.01e-5 , 2.36e-5, 3.0e-5, 7.0e-5, 4.5e-5, 3.8e-5,
#                      4.2e-5, 2.62e-5, 3.6e-5])
# copper = np.array([4.5e-5 , 1.97e-5 , 1.6e-5, 1.97e-5, 4.0e-5, 2.4e-5, 1.9e-5, 
#                    2.41e-5 , 1.85e-5, 3.3e-5 ])
# steel = np.array([3.3e-5 , 1.2e-5 , 0.9e-5, 1.2e-5, 1.3e-5, 1.6e-5, 1.4e-5, 
#                   1.58e-5, 1.32e-5 , 2.1e-5])

# x_values = np.array([i for i in range(len(aluminum))])
# plt.scatter(x_values,aluminum,label="Aluminium")
# plt.scatter(x_values,copper,label="Copper")
# plt.scatter(x_values,steel,label="Steel")
# plt.title("Initial Data Visualization")
# plt.legend()
# plt.show()

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

def multiply_list_val(list, value):
    new_list = []
    for i in list:
        new_list.append(i * value)
    return new_list

print('make question data constructs (easy of use, behavioral intentions, explanation, perc_accuracy, perc_fairness)')
ease_of_use = multiply_list_val(data_per_question[3-1],1.129)
behavioral_intentions = np.add(multiply_list_val(data_per_question[5-1],1.056), 
                               multiply_list_val(data_per_question[25-1],0.948)).tolist()
explanation = np.add(
    np.add(multiply_list_val(data_per_question[4-1],0.959),multiply_list_val(data_per_question[6-1],0.982))
    ,multiply_list_val(data_per_question[9-1],0.743)).tolist()
perc_accuracy = np.add(multiply_list_val(data_per_question[1-1],0.740),multiply_list_val(data_per_question[13-1],0.714)).tolist()
perc_fairness = np.add(multiply_list_val(data_per_question[2-1],0.784),multiply_list_val(data_per_question[11-1],0.586)).tolist()

question_data_constructs = [ease_of_use, behavioral_intentions, explanation, perc_accuracy, perc_fairness]
print('question_data_constructs: ', question_data_constructs)
# print('len(question_data_constructs): ', len(question_data_constructs))
print('question_data_constructs[0] = ease of use: ', question_data_constructs[0])
print('len(question_data_constructs[0]): ', len(question_data_constructs[0]))


# def combine_lists(list1, list2):
#     combined_list = []
#     for item1, item2 in zip(list1, list2):
#         if isinstance(item1, list) and isinstance(item2, list):
#             combined_list.append(combine_lists(item1, item2))
#         else:
#             combined_list.append(item1 + item2)
#     return combined_list

algo = ['Pre', 'Pre', 'Post', 'Post', 'Pre', 'Pre', 'Pre', 'Pre', 'Pre', 'Pre', 'Pre', 'Post', 'Post', 'Post', 'Post', 'Pre', 'Pre', 'Pre', 'Pre', 'Pre', 'Pre', 'Pre', 'Post', 'Post', 'Pre', 'Pre', 'Post', 'Post', 'Post', 'Post', 'Post', 'Pre', 'Pre', 'Post', 'Post', 'Post', 'Post', 'Pre', 'Post', 'Post', 'Post', 'Pre', 'Post', 'Post', 'Post', 'Post', 'Pre', 'Pre', 'Post', 'Post', 'Pre', 'Pre', 'Pre', 'Pre', 'Pre', 'Pre', 'Pre', 'Post', 'Post', 'Pre', 'Pre', 'Post', 'Post', 'Post', 'Post', 'Post', 'Post', 'Pre', 'Post', 'Post', 'Pre', 'Pre', 'Post', 'Post', 'Pre', 'Pre', 'Post', 'Post', 'Pre', 'Pre'],
vis = ['User', 'User', 'User', 'User', 'User', 'User', 'Content', 'Content', 'Content', 'Content', 'User', 'User', 'User', 'Content', 'Content', 'Content', 'Content', 'User', 'User', 'User', 'User', 'User', 'User', 'User', 'Content', 'Content', 'User', 'User', 'Content', 'Content', 'Content', 'Content', 'Content', 'Content', 'Content', 'User', 'Content', 'Content', 'Content', 'Content', 'User', 'Content', 'Content', 'Content', 'Content', 'Content', 'User', 'User', 'User', 'User', 'User', 'User', 'User', 'User', 'User', 'User', 'User', 'Content', 'Content', 'Content', 'Content', 'User', 'User', 'User', 'User', 'Content', 'Content', 'User', 'User', 'User', 'Content', 'Content', 'User', 'User', 'Content', 'Content', 'Content', 'Content', 'Content', 'Content'],
together = ['PreUser', 'PreUser', 'PostUser', 'PostUser', 'PreUser', 'PreUser', 'PreContent', 'PreContent', 'PreContent', 'PreContent', 'PreUser', 'PostUser', 'PostUser', 'PostContent', 'PostContent', 'PreContent', 'PreContent', 'PreUser', 'PreUser', 'PreUser', 'PreUser', 'PreUser', 'PostUser', 'PostUser', 'PreContent', 'PreContent', 'PostUser', 'PostUser', 'PostContent', 'PostContent', 'PostContent', 'PreContent', 'PreContent', 'PostContent', 'PostContent', 'PostUser', 'PostContent', 'PreContent', 'PostContent', 'PostContent', 'PostUser', 'PreContent', 'PostContent', 'PostContent', 'PostContent', 'PostContent', 'PreUser', 'PreUser', 'PostUser', 'PostUser', 'PreUser', 'PreUser', 'PreUser', 'PreUser', 'PreUser', 'PreUser', 'PreUser', 'PostContent', 'PostContent', 'PreContent', 'PreContent', 'PostUser', 'PostUser', 'PostUser', 'PostUser', 'PostContent', 'PostContent', 'PreUser', 'PostUser', 'PostUser', 'PreContent', 'PreContent', 'PostUser', 'PostUser', 'PreContent', 'PreContent', 'PostContent', 'PostContent', 'PreContent', 'PreContent']

preuser_indexes = []
precontent_indexes = []
postuser_indexes = []
postcontent_indexes = []

for i in range(len(together)):
    if together[i] == 'PreUser':
        preuser_indexes.append(i)
    elif together[i] == 'PreContent':
        precontent_indexes.append(i)
    elif together[i] == 'PostUser':
        postuser_indexes.append(i)
    elif together[i] == 'PostContent':
        postcontent_indexes.append(i)

construct_index = 0
std_devs = []
averages = []

for curr_construct_answers in question_data_constructs:
    # current construct (ease_of_use, behav_intentions, explanation, perc_accuracy, perc_fairness)
    print('construct_index: ', construct_index)
    if construct_index == 0:
        print('current construct: ease_of_use')
    elif construct_index == 1:
        print('current construct: behav_intentions')
    elif construct_index == 2:
        print('current construct: explanation')
    elif construct_index == 3:
        print('current construct: perc_accuracy')
    elif construct_index == 4:
        print('current construct: perc_fairness')


    # calculate average per use case combination and per construct (20 avgs in total)
    answers_of_this_combination = []

    print('use indices for avd and std: ', preuser_indexes)
    for i in preuser_indexes:
        answers_of_this_combination.append(curr_construct_answers[i])
    averages.append(np.mean(answers_of_this_combination))
    std_devs.append(np.std(answers_of_this_combination))
    answers_of_this_combination = []

    print('use indices for avd and std: ', precontent_indexes)
    for i in precontent_indexes:
        answers_of_this_combination.append(curr_construct_answers[i])
    averages.append(np.mean(answers_of_this_combination))
    std_devs.append(np.std(answers_of_this_combination))
    answers_of_this_combination = []

    print('use indices for avd and std: ', postuser_indexes)
    for i in postuser_indexes:
        answers_of_this_combination.append(curr_construct_answers[i])
    averages.append(np.mean(answers_of_this_combination))
    std_devs.append(np.std(answers_of_this_combination))
    answers_of_this_combination = []

    print('use indices for avd and std: ', postcontent_indexes)
    for i in postcontent_indexes:
        answers_of_this_combination.append(curr_construct_answers[i])
    averages.append(np.mean(answers_of_this_combination))
    std_devs.append(np.std(answers_of_this_combination))
    answers_of_this_combination = []

    construct_index += 1

print('averages ([ease of use 4x, behav_intentions 4x, explanation 4x, perc_accuracy 4x, perc_fairness 4x]): ', averages)
print('std_devs: ', std_devs)

# construct_index:  0
# average:  4.34665
# average:  4.91115
# average:  4.79825
# average:  4.516000000000001
# construct_index:  1
# average:  6.1176
# average:  8.517
# average:  8.1324
# average:  7.3038
# construct_index:  2
# average:  9.054899999999998
# average:  10.623399999999998
# average:  10.683149999999998
# average:  9.331799999999998
# construct_index:  3
# average:  5.667999999999999
# average:  6.2126
# average:  5.5966
# average:  5.7446
# construct_index:  4
# average:  5.4704999999999995
# average:  6.0474
# average:  5.5679
# average:  5.518800000000001

# make error bars for the constructs that had significant differences

# data to plot
n_groups = 5
pre_user_avgs = (4.34665, 6.1176, 9.054899999999998, 5.667999999999999, 5.4704999999999995)
pre_content_avgs = (4.91115, 8.517, 10.623399999999998, 6.2126, 6.0474)
post_user_avgs = (4.79825, 8.1324, 10.683149999999998, 5.5966, 5.5679)
post_content_avgs = (4.516000000000001, 7.3038, 9.331799999999998, 5.7446, 5.518800000000001)
pre_user_std = (1.6467539972624934   , 2.606836979943318,  3.020589477237845,  1.118218940995009, 1.2932815432070464)
pre_content_std = (0.9629648630661451, 1.6623308334985547, 2.4387727938452977, 1.0392714948462696, 1.0446526886961043)
post_user_std = (0.9361173470778115,   1.6668388764364717, 2.1331771908353043, 1.2384280520078668, 1.0275838603247909)
post_content_std = (1.335850815023893, 1.7725640073069293, 2.4751536437158808, 1.1465105494499384, 0.7622389126776459)

# create plot
fig, ax = plt.subplots()
index = np.arange(n_groups)
bar_width = 0.2
opacity = 0.8

rects1 = plt.bar(index, pre_user_avgs, bar_width,
alpha=opacity,
color='#4BE27F',
label='Pre-filtering + User-based Visual')

rects2 = plt.bar(index + bar_width, pre_content_avgs, bar_width,
alpha=opacity,
color='#9A59F7',

label='Pre-filtering + Content-based Visual')

rects3 = plt.bar(index + bar_width + bar_width, post_user_avgs, bar_width,
alpha=opacity,
color='#F7D359',
label='Post-filtering + User-based Visual')

rects4 = plt.bar(index + bar_width + bar_width + bar_width, post_content_avgs, bar_width,
alpha=opacity,
color='#F75959',
label='Post-filtering + Content-based Visual')

#calculate std dev of constructs per condition
pre_user_std = np.std(pre_user_avgs)

# Add vertical error bars containing std dev
plt.errorbar(index, pre_user_avgs, yerr=pre_user_std, color='black', alpha=0.6, linestyle='None')
plt.errorbar(index + bar_width, pre_content_avgs, yerr=pre_content_std, color='black', alpha=0.6, linestyle='None')
plt.errorbar(index + 2 * bar_width, post_user_avgs, yerr=post_user_std, color='black', alpha=0.6, linestyle='None')
plt.errorbar(index + 3 * bar_width, post_content_avgs, yerr=post_content_std, color='black', alpha=0.6, linestyle='None')




# plt.errorbar(index, pre_user_avgs, yerr=0.5, color='black', alpha=0.6, linestyle='None')
# plt.errorbar(index + bar_width, pre_content_avgs, yerr=0.5, color='black', alpha=0.6, linestyle='None')
# plt.errorbar(index + 2 * bar_width, post_user_avgs, yerr=0.5, color='black', alpha=0.6, linestyle='None')
# plt.errorbar(index + 3 * bar_width, post_content_avgs, yerr=0.5, color='black', alpha=0.6, linestyle='None')


# plt.xlabel('Constructs')
plt.ylabel('Average scores per construct')
plt.title('Average scores per construct, for each use case combination')
plt.xticks(index + 2 * bar_width, ('Ease of use', 'Behavioural intentions', 
                                   'Perceived explanation', 'Perceived accuracy', 'Perceived fairness'))
plt.legend()

plt.tight_layout()
plt.show()

