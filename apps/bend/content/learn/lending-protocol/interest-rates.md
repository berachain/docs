# Interest Rates

> The Bend protocol mitigates risk by controlling borrowing interest rates.

Bend's variable interest rates are determined primarily by the protocol's **utilization ratio** $U$, which is the ratio of borrowed `$HONEY` to the total supplied `$HONEY`:

`U = Total Borrowed / Total Supplied`

There is an **Interest Rate Model** which controls the borrowing costs of `$HONEY` on Bend:

- The model incentivizes users to borrow `$HONEY` with low interest rates when the protocol is underutilized.
- The model disincentivizes borrowing `$HONEY` when the protocol is overutilized (with high interest rates).

The interest rate is calculated using the following formula:

When $U \leq U_{optimal}$:
$$R_t = R_0 + \frac{U_t}{U_{optimal}} R_{slope1}$$
When $U > U_{optimal}$:
$$R_t = R_0 + R_{slope1} + \frac{U_t - U_{optimal}}{1 - U_{optimal}} R_{slope2}$$

There is an optimal utilization $U_{optimal}$ after which the interest rate ramps up more steeply. This is to ensure that the protocol remains solvent and that the borrowing demand is kept in check.

## Interest Rate Examples

The interest rate curve resembles a "hockey stick graph", where the graph turns upward sharply after the optimal utilization ratio is reached. Higher borrowing APRs also translate to higher interest rates for `$HONEY` suppliers. The spread between the two rates reflects the fees which are collected and paid to `$BGT` stakers.

:::warning
These examples are illustrative and do not reflect the actual interest rate model parameters
:::

### Low/Normal Utilization

70% utilization example:
![Low Utilization](/assets/utilization-low.png)

### High Utilization

95% utilization example:
![High Utilization](/assets/utilization-high.png)

## Interest Rate Model Parameters

:::warning
Best efforts are made to keep these parameters up to date, but they are subject to change by governance. Consult the UI or contracts for the latest parameters.
:::

Below are the parameters for the `$HONEY` borrowing market:

| Parameters                | Value |
| ------------------------- | ----- |
| Optimal Usage             | 80%   |
| Base Variable Borrow Rate | 0     |
| Variable Rate Slope 1     | 4%    |
| Variable Rate Slope 2     | 75%   |
| Base Stable Borrow Rate   | 1%    |
| Stable Rate Slope 1       | 0.5%  |
| Stable Rate Slope 2       | 75%   |
