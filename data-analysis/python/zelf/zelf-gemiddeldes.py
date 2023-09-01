import pandas as pd

# data = pd.read_excel('new.xlsx')
# print('data.columns: ', data.columns)
# df = pd.DataFrame(data)
# print('df: ',df)
# print('columns: ', df.columns)
# print('dfiloc: ', df.iloc[1])
# print(df[1])
# mylist = df[0].tolist()
# print(mylist)

data = pd.read_excel('./excel/data_userstudy.xlsx', header=None)
data_list = data.values.tolist()

print(data_list)
print(data_list[0])

def get_average_from_column(data_list, column):
    sum = 0
    for i in range(len(data_list)):
        sum += data_list[i][column]
    return sum/len(data_list)

print('average of column 1: ',get_average_from_column(data_list, 1))

def get_column_averages(data_list):
    averages = []
    for i in range(1,len(data_list[0])):
        averages.append(get_average_from_column(data_list, i))
    return averages

print('averages per column: ', get_column_averages(data_list))

def get_averages_for_code(data_list, code):
    averages = []
    new_data_list = []
    for i in range(len(data_list)):
        if data_list[i][0][0:2] == code[0:2]:
            # data_list[i] are only the rows with the code
            new_data_list.append(data_list[i])
    averages = get_column_averages(new_data_list)
    return averages

print('averages for code ay: ', get_averages_for_code(data_list, 'ay'))
print('averages for code az: ', get_averages_for_code(data_list, 'az'))
print('averages for code by: ', get_averages_for_code(data_list, 'by'))
print('averages for code bz: ', get_averages_for_code(data_list, 'bz'))

import pandas as pd
import numpy as np

data = pd.read_excel('./excel/data_userstudy.xlsx', header=None)
data_list = data.values.tolist()

def get_std_dev_from_column(data_list, column):
    values = [row[column] for row in data_list]
    return np.std(values).round(2)

print('standard deviation of column 1:', get_std_dev_from_column(data_list, 1))

def get_column_std_devs(data_list):
    std_devs = []
    for i in range(1, len(data_list[0])):
        std_devs.append(get_std_dev_from_column(data_list, i))
    return std_devs

print('standard deviations per column:', get_column_std_devs(data_list))

def get_std_devs_for_code(data_list, code):
    std_devs = []
    new_data_list = [row for row in data_list if row[0][0:2] == code[0:2]]
    std_devs = get_column_std_devs(new_data_list)
    return std_devs

print('standard deviations for code ay:', get_std_devs_for_code(data_list, 'ay'))
print('standard deviations for code az:', get_std_devs_for_code(data_list, 'az'))
print('standard deviations for code by:', get_std_devs_for_code(data_list, 'by'))
print('standard deviations for code bz:', get_std_devs_for_code(data_list, 'bz'))
