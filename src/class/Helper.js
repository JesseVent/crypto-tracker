import Cookies from 'js-cookie';
/**
 * helper class
 */
export default class Helper {
  /**
   * get color based on a number > 0, green > red
   * @param  {[type]} feed    [new feed]
   * @param  {[type]} oldFeed
   * @return {[type]}  string
   */
  getColor(num) {
      if (num > 0) {
        return "green";
      } else {
        return "red";
      }
  }

  /**
   * returned filtered coin data - if there is no prefrence return top 10 coins
   * @param  {[type]} coins         [all coins]
   * @param  {[type]} filteredCoins [coins to get]
   * @return {[type]}               [description]
   */
  filterCoins(coins) {
    let filteredCoins = Cookies.get('filteredCoins');
    if (typeof filteredCoins === 'undefined' || filteredCoins.replace(' ', '') === "") {
      return coins.filter(function(coin) {
        for (var i = 0; i < 24; i++) {
          if (coin.rank * 1 === i + 1) {
            return 1;
          }
        }
        return 0;
      });
    } else {
      filteredCoins = filteredCoins.replace(' ', '').split(',');
      return coins.filter(function(coin) {
        for (var i = 0; i < filteredCoins.length; i++) {
          if (filteredCoins[i].toUpperCase() === coin.symbol) {
            return 1;
          }
        }
        return 0;
      });
    }
  }

  /**
   * Format numbers for better readability
   * @param  {[type]} num
   * @return {[type]} string
   */
  formatNumber(num) {
    // Ensure value is a number first
    num = num * 1;

    // Source: https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript#149099
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });

    return formatter.format(num);
  }

  /**
  Format UNIX Datetimestamps into normal readable Datetimestamps
  * @param {[type]} timestamp
  * @return {[type]} time
  */
  convertTimestamp(timestamp) {
  var d = new Date(timestamp * 1000),	// Convert the passed timestamp to milliseconds
		yyyy = d.getFullYear(),
		mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
		dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
		hh = d.getHours(),
		h = hh,
		min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
		ampm = 'AM',
		time;

	if (hh > 12) {
		h = hh - 12;
		ampm = 'PM';
	} else if (hh === 12) {
		h = 12;
		ampm = 'PM';
	} else if (hh === 0) {
		h = 12;
	}

	// ie: 2013-02-18, 8:35 AM
	time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

	return time;
}
}
