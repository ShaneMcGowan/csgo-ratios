# How to bankrupt a CS:GO Gambling Site
###### An explanation on how CS:GO gambling sites are exploitable to an extreme degree

Awhile back CS:GO Gambling websites were all the rage but after some minor legal issues and breach of Valve™'s terms of service most sites called it a day and shut down. However this did not last long as sites simply moved their hosting out of the US and into countries with much more relaxed gambling laws.

## What is a CS:GO Gambling Site?
These sites allow a user to deposit their virtual items for the game "Counter Strike:Global Offensive", or "CS:GO" for short, for coins based on the items current real world money value and allowing players to use those coins to gamble in various casino games. The player can then cash their coins out for items of equivalent value.



## Steam Community Market & Third party sites

###### *The Steam Community Market, commonly known as the Steam Market, is an in-game item trading service provided by Valve and is available to all users of Steam. Steam users are able to use the Steam Market to buy or sell in-game items with/for their Steam wallet funds.* [counterstrike.wikia.com - 18/08/17](http://counterstrike.wikia.com/wiki/Steam_Market)

Steam wallet funds cannot be removed from the steam platform so users go off site to sell their items. Selling your items on these sites provides several advantages over selling your items on the Steam Community Market.

- No trade hold
Items bought from the Steam Community Market cannot be traded for 7 days after purchase (but can be sold again immediately). This does not apply to these third party sites.
- Lower fees
Steam Community market charges a sale fee of 5% for all items and an additional 10% for CS:GO Items. Third party sites often charge only 10% or lower, with sites such as [OPSkins.com](opskins.com) offering a monthly subscription fee for a lower per sale fee.
- Cash out
Steam wallet funds cannot be removed from steam, these sites allow you to sell your items and withdraw your money via Paypal, Bitcoin etc.

These reasons and more are why these third party sites have become very popular in recent years with millions of items being sold through them.

## The Flaw
Because all these third party sites exist, this leads to inconsistency of item prices across them all. Using this information we are easily able to exploit the way a gambling site values their items. Most sites use the service [Steam Analyst](https://csgo.steamanalyst.com/) for their pricing. While the pricing is accurate for the most part, you will often find their prices can be inconsistent for items that sell very rarely or gain a sudden surge in popularity. This is where the flaw exists and is how you can make some serious profit if you were to be so inclined.

An excellent example of this is the site CSGODouble.com which has since shut down (with many clones springing up in their place). On April 11th 2016 the site accidentally over valued the item [Autograph Capsule | Challengers (Foil) | MLG Columbus 2016](https://opskins.com/?loc=shop_view_item&item=16058889) by 200%, several people caught on early and the site was filled with over 40'000 of this and similar items in just under 12 hours (Presumably while the owner was asleep). All items of value were removed from the site by users exploiting this overvaluation losing the site well over $80,000.

This was possible as the site did not have any withdraw conditions. Most sites have since implemented a policy of only being able to withdraw twice what you have bet or something similar. This seems to have stopped this issue occurring again but is easily circumvented.

## The exploit (the maths bit)
In order to get around this we are going to have to "Launder" our money on these sites. This is done by playing roulette. You may now be thinking "Isn't that gambling?" to which I will reply "No friend, don't worry about it ♥".
Most of the sites use a roulette board with 15 segments, 7 red, 7 black and 1 green. With all laundering processes you are ofcourse going to lose money doing this but don't worry, our profits will offset that immediately.
Red and Black both pay double.
Green pays fourteens times your bet.
So to launder our money we take our bet, lets say it is 150.
We divide this by 15 (total segments) to get our bet per segment(**bps**) of 10.
So now we place our bets as follows.
#### Red : 7*bps (7*10)
#### Black : 7*bps (7*10)
#### Green : 1*bps (1*10)
#### Winnings for each case : 140

We have now a bet where we will always come out with 14/15 or 93.333~% of our bet and are now able to withdraw items to 2x the value of our bet. This 14/15 is important when choosing which items to withdraw later.
Now all we need is a nice big list of prices for all the items on the gambling site and on the third party marketplaces, luckily I have made a chrome extension to do this for me, it works with most CS:GO Gambling sites that use the original CSGODouble.com source code, you can usually tell since they all look the same with different colours ([link to it here if you want to play with it](https://github.com/Szenmu/csgo-ratios), excuse the terrible code it was made when I was terrible at JavaScript and didn't know CSS).
We just go to the withdraw page on our Gambling site of choice (Mine being [CSGO Polygon](https://csgopolygon.com/)), scrape the prices, get the prices from our favourite CSGO Market place with API (Mine being [OPSkins](https://opskins.com/kb/api-v2)), divide one against the other to get the "Coin per Dollar ratio" (**CPD**)

An item with a High CPD means we should buy it off the marketplace and deposit it onto the site.
An item with a Low CPD means we want to withdraw it from the Site.

Now to make sure we are making a profit here we need to adjust our CPD using the following formula.

#### (CPD x (LaunderValue)) x (1-SaleFee)

Lets do an example.
You deposit items at a CPD of **15**.
Your fee for selling the items you withdraw on OPSkins is **10%**.
You lost 1/15 (6.666~%) of your items value due to the laundering so you have **14/15** of your coins remaining.
Apply this to our formula and we get (15 x (14/15)) x (1-.1) which is **12.6**. This means you can withdraw any item with a CPD below 12.6 and make a profit. And that's it, free money (if you consider your time worthless like I do mine ♥)

## Tips (Because I'm lovely)
This can be an incredibly boring process so here's some tips to help you.
- Check an items price before withdrawing
Make sure an item's price isn't being manipulated and has been consistent or at least a month or so.
- Only withdraw items that sell regularly
This way you can guarantee you will be able to sell the item quickly and at the price you expected to get for it.
- Use two accounts
Betting red, black and green on one account makes it very obvious as to what you are doing and might result in a ban, so bet red and green on one account and black on the other, those are legitimate bets. Doing this makes you less detectable but you will need to spread your deposits equally between accounts so you don't end up with all your money in account one while account two has a withdraw amount of eight times that.
- Don't brag
Obviously site owners don't want you doing this so stay quite and be a good boy (or girl).

## Wrap Up!
If you enjoyed this and want to see more from me please favourite this post, follow me on here and on [twitter](https://twitter.com/theshanemcgowan) and leave a comment.
If you have any questions please feel free to ask!

Thanks for reading friend ♥




