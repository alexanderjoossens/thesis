# Load modules and data
import numpy as np

import statsmodels.api as sm

spector_data = sm.datasets.spector.load()
print('specter_data:, ', spector_data.exog[:10])

spector_data.exog = sm.add_constant(spector_data.exog, prepend=False)

print('specter_data.exog: ', spector_data.exog[:10])

# Fit and summarize OLS model
mod = sm.OLS(spector_data.endog, spector_data.exog)

res = mod.fit()

print(res.summary())