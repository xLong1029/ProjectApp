/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'solo\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-arrow-down': '&#xe900;',
		'icon-back': '&#xe901;',
		'icon-case': '&#xe902;',
		'icon-company': '&#xe903;',
		'icon-disable': '&#xe904;',
		'icon-fail': '&#xe905;',
		'icon-group': '&#xe906;',
		'icon-home': '&#xe907;',
		'icon-horn': '&#xe908;',
		'icon-list': '&#xe909;',
		'icon-loading': '&#xe90a;',
		'icon-logo': '&#xe90b;',
		'icon-news': '&#xe90c;',
		'icon-next': '&#xe90d;',
		'icon-project-list': '&#xe90e;',
		'icon-search': '&#xe90f;',
		'icon-success': '&#xe910;',
		'icon-warning': '&#xe911;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
