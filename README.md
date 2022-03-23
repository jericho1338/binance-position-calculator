# Binance Futures Position Calculator

Position size calculator for trading futures on Binance.

Automatically calculates position size for your trades, based on your current portfolio value and preferred risk.

Especially useful for quick scalping, where you just enter your stop loss price, and the position size is automatically updated as the price changes!

You can adjust your risk, taker and maker fees, % of your portfolio on the exchange and types of your entry/sl/tp orders.

Binance Futures Position Calculator does not use API keys or login credentials, nor it interferes with your Binance account in any way.
All the values are read directly from DOM and calculated on the fly.

Happy trading!

## Installation

Go to https://chrome.google.com/webstore/detail/binance-futures-position/jdgkpkggiafiaoopflnocfledpojiekb and install the plugin!

## Usage

The position size calculation is done based on your Stop Loss value. Therefore, in order to use it, the **TP/SL checkbox has to be checked**. If the checkbox is not checked, the calculation is not performed. As soon as you have the **TP/SL checkbox checked** and Stop Loss value entered, position size gets calculated.

### Limit orders

If you're using Limit orders, then you're required to input Stop Loss value and the Price (entry) value. The calculations are being made as soon as one of those 2 fields is changed. If the Take Profit amount is not entered, the position size and R:R is still calculated, but without the "reward" portion displated. When you enter Take Profit amount, the full calculation details with the reward details are being presented.

Have in mind that the position calculator **only works when the TP/SL checkbox is checked**, because the risk can only be calculated when you define your Stop Loss value.

### Market orders

When using market orders, only Stop Loss value has to be set. The plugin will read the current asset value from the page, and update the Position Size as soon as it changes. This is particularly useful for quick scalps when you want to be able to quickly enter the trade.

Have in mind that the position calculator **only works when the TP/SL checkbox is checked**, because the risk can only be calculated when you define your Stop Loss value.

## Options

**Extension ON/OFF**

- Turning the extension ON or OFF

**Max risk (on a trade) %**

- maximum percentage risk on each trade - percent values used

**Taker fee %**

- your current Taker fee - used only for display purposes in the log window, taker/maker fees not included in the position calculation

**Maker fee %**

- your current Maker fee - used only for display purposes in the log window, taker/maker fees not included in the position calculation

**Portfolio % on exchange**

- if you're keeping only a portion of your portfolio on the exchange (for security reasons), set this setting to the percent of the portfolio on the exchange. This way the position size will match your full portfolio, instead being calculated off the funds available on the exchange

**Entry order type**

- used to display entry fee in the log window

**Take Profit order type**

- used to display take profit fee in the log window

**Stop loss order type**

- used to display stop loss fee in the log window

**Hide PNL on active position**

- hides the current PNL in Active positions tab. Have in mind that the PNL might still be shown on the chart, if using TradingView charts

**Prevent market buy without SL**

- Prevents you from executing a Market order if the Stop Loss is not defined

**Logger window ON/OFF**

- the yellow log window with calculation details can be be hidden, but the position size will still be set automatically

# Disclaimer

Last updated: March 15, 2022

# Interpretation and Definitions

## Interpretation

The words of which the initial letter is capitalized have meanings defined
under the following conditions. The following definitions shall have the same
meaning regardless of whether they appear in singular or in plural.

## Definitions

For the purposes of this Disclaimer:

- Company (referred to as either "the Company", "We", "Us" or "Our" in this
  Disclaimer) refers to Binance Futures Position Calculator.

- Service refers to the Application.

- You means the individual accessing the Service, or the company, or other
  legal entity on behalf of which such individual is accessing or using the
  Service, as applicable.

- Application means the software program provided by the Company downloaded
  by You on any electronic device named Binance Futures Position Calculator.

# Disclaimer

The information contained on the Service is for general information purposes
only.

The Company assumes no responsibility for errors or omissions in the contents
of the Service.

In no event shall the Company be liable for any special, direct, indirect,
consequential, or incidental damages or any damages whatsoever, whether in an
action of contract, negligence or other tort, arising out of or in connection
with the use of the Service or the contents of the Service. The Company
reserves the right to make additions, deletions, or modifications to the
contents on the Service at any time without prior notice. This Disclaimer has
been created with the help of the [Disclaimer
Template](https://www.termsfeed.com/blog/sample-disclaimer-template/).

The Company does not warrant that the Service is free of viruses or other
harmful components.

# External Links Disclaimer

The Service may contain links to external websites that are not provided or
maintained by or in any way affiliated with the Company.

Please note that the Company does not guarantee the accuracy, relevance,
timeliness, or completeness of any information on these external websites.

# Errors and Omissions Disclaimer

The information given by the Service is for general guidance on matters of
interest only. Even if the Company takes every precaution to insure that the
content of the Service is both current and accurate, errors can occur. Plus,
given the changing nature of laws, rules and regulations, there may be delays,
omissions or inaccuracies in the information contained on the Service.

The Company is not responsible for any errors or omissions, or for the results
obtained from the use of this information.

# Fair Use Disclaimer

The Company may use copyrighted material which has not always been
specifically authorized by the copyright owner. The Company is making such
material available for criticism, comment, news reporting, teaching,
scholarship, or research.

The Company believes this constitutes a "fair use" of any such copyrighted
material as provided for in section 107 of the United States Copyright law.

If You wish to use copyrighted material from the Service for your own purposes
that go beyond fair use, You must obtain permission from the copyright owner.

# Views Expressed Disclaimer

The Service may contain views and opinions which are those of the authors and
do not necessarily reflect the official policy or position of any other
author, agency, organization, employer or company, including the Company.

Comments published by users are their sole responsibility and the users will
take full responsibility, liability and blame for any libel or litigation that
results from something written in or as a direct result of something written
in a comment. The Company is not liable for any comment published by users and
reserves the right to delete any comment for any reason whatsoever.

# No Responsibility Disclaimer

The information on the Service is provided with the understanding that the
Company is not herein engaged in rendering legal, accounting, tax, or other
professional advice and services. As such, it should not be used as a
substitute for consultation with professional accounting, tax, legal or other
competent advisers.

In no event shall the Company or its suppliers be liable for any special,
incidental, indirect, or consequential damages whatsoever arising out of or in
connection with your access or use or inability to access or use the Service.

# "Use at Your Own Risk" Disclaimer

All information in the Service is provided "as is", with no guarantee of
completeness, accuracy, timeliness or of the results obtained from the use of
this information, and without warranty of any kind, express or implied,
including, but not limited to warranties of performance, merchantability and
fitness for a particular purpose.

The Company will not be liable to You or anyone else for any decision made or
action taken in reliance on the information given by the Service or for any
consequential, special or similar damages, even if advised of the possibility
of such damages.

# Contact Us

If you have any questions about this Disclaimer, You can contact Us:

- By email: siric.luka@mail.com
