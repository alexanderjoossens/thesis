import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import statsmodels.api as sm

np.random.seed(9876789)


nsample = 100
x = np.linspace(0, 10, 100)
print('x: ', x)
X = np.column_stack((x, x ** 2))
print('X: ', X)
beta = np.array([1, 0.1, 10])
e = np.random.normal(size=nsample)
print('e (100 random numbers normally distributed around 0): ', e)

X = sm.add_constant(X)
print('X (3 columns: from 1 to 1, from 0 to 10, from 0 to 100): ', X)
y = np.dot(X, beta) + e
print('y (4 columns: from 1 to 100 three times and from 1 to 1000 once): ', y)

model = sm.OLS(y, X)
results = model.fit()
print('results: ', results)
print(results.summary())

print("Parameters: ", results.params)
print("R2: ", results.rsquared)

nsample = 50
sig = 0.5
x = np.linspace(0, 20, nsample)
X = np.column_stack((x, np.sin(x), (x - 5) ** 2, np.ones(nsample)))
beta = [0.5, 0.5, -0.02, 5.0]

y_true = np.dot(X, beta)
y = y_true + sig * np.random.normal(size=nsample)

res = sm.OLS(y, X).fit()
print(res.summary())

pred_ols = res.get_prediction()
iv_l = pred_ols.summary_frame()["obs_ci_lower"]
iv_u = pred_ols.summary_frame()["obs_ci_upper"]

fig, ax = plt.subplots(figsize=(8, 6))

ax.plot(x, y, "o", label="data")
ax.plot(x, y_true, "b-", label="True")
ax.plot(x, res.fittedvalues, "r--.", label="OLS")
ax.plot(x, iv_u, "r--")
ax.plot(x, iv_l, "r--")
ax.legend(loc="best")

plt.show()
