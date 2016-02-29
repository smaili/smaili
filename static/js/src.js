function cube(face) {

	var
		cssTransformStyle,
		cssTransformCallback,

		currentFace = face || 2,
		xAngle,
		yAngle,

		doc = document,
		myCube = doc.getElementById('mycube'),
    mapLinks = doc.getElementById('map').childNodes,
		faceLinks = _getElementsByClassName('face-link'),
    placeholder = doc.getElementById('placeholder'),
    noCSS3 = doc.getElementById('no_css3');


	function _getElementsByClassName(classname) {
		if (doc.getElementsByClassName) {
			return doc.getElementsByClassName(classname);
		} else if (doc.querySelectorAll) {
			return doc.querySelectorAll('.' + classname);
		} else {
			var a = [],
				re = new RegExp('(^| )' + classname + '( |$)'),
				els = doc.getElementsByTagName('*');

			for (var i = 0; i < els.length; i++) {
				if (re.test(els[i].className)) {
					a.push(els[i]);
				}
			}

			return a;
		}
	}

	function _addClass(element, classname) {
		element.className+= ' ' + classname;
	}

	function _removeClass(element, classname) {
		element.className = element.className.replace(new RegExp('(\\s|^)' + classname + '(\\s|$)',''));
	}

  function _getData(element, attr) {
    var attrs = element.attributes,
        data = false;
    for (var i = 0; i < attrs.length; i++) {
      if (attrs[i].name == attr) {
        data = attrs[i].value;
        break;
      }
    }
    return data;
  }

  function _setUpCSS3() {
    var style = doc.createElement('div').style;

    // test for perspectives
    var perspectives = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'],
        supportsPerspectives = false;
    for (p in perspectives) {
      if (style[perspectives[p]] !== undefined) {
        supportsPerspectives = true;
        break;
      }
    }

    // need to extra test for webkit due to chrome false positives bug
    if (supportsPerspectives && "webkitPerspective" in doc.documentElement.style) {
      var test = '@media (transform-3d),(-webkit-transform-3d),(-moz-transform-3d),(-o-transform-3d),(-ms-transform-3d),(-khtml-transform-3d),(modernizr)',
          testStyle = doc.createElement('style'),
          testDiv = doc.createElement('div'),
          result;

      testStyle.textContent = test + '{#modernizr{height:3px}}';
      ( doc.head || doc.getElementsByTagName("head")[0] ).appendChild(testStyle);
      testDiv.id = 'modernizr';
      doc.documentElement.appendChild(testDiv);
      result = ( testDiv.offsetHeight === 3 );
      testStyle.parentNode.removeChild(testStyle);
      testDiv.parentNode.removeChild(testDiv);
      if (!result) {
        supportsPerspectives = false;
      }
   }

    // test for csstransitions
    var transitions = ['transitionProperty', 'WebkitTransitionProperty', 'MozTransitionProperty', 'OTransitionProperty', 'msTransitionProperty', 'KhtmlTransitionProperty'],
        supportsTransitions = false;
    for (t in transitions) {
      if (style[transitions[t]] !== undefined) {
        supportsTransitions = true;
        break;
      }
    }

    if (supportsPerspectives && supportsTransitions) {
      var transforms = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform'];

      for (t in transforms) {
        if (style[transforms[t]] !== undefined) {
          cssTransformStyle = transforms[t];
        }
      }
    }

  }

	function init() {
    _setUpCSS3();
    if (cssTransformStyle) {
      // listeners
      for (var i = 0; i < faceLinks.length; i++) { 
        faceLinks[i].onclick = function(e) {
          onLinkClick.call(this, e);
        }
      }

      // show face
      setNewFace(currentFace);
      rotate();
      // show the cube instead of the js-disabled div
      placeholder.parentNode.removeChild(placeholder);
      myCube.style.display = 'block';
      _addClass(myCube, 'transition');
    } else {
      // show the warning to user that css3 is not available
      noCSS3.style.display = 'block';
    }
	}

	function onLinkClick(e) {
		e.preventDefault();

		var newFace = parseInt( _getData(this, 'data-face' ) );
    if (newFace != currentFace) {
      setNewFace(newFace);
  		rotate();
  		updateLinks(newFace);
    }
	}

	function setNewFace(newFace) {
		switch (newFace) {
			case 1:
				xAngle = -90, yAngle = 0;
				break;
			case 2:
				xAngle = 0, yAngle = 0;
				break;
			case 3:
				xAngle = 0, yAngle = -90;
				break;
			case 4:
				xAngle = 0, yAngle = -180;
				break;
			case 5:
				xAngle = 0, yAngle = 90;
				break;
			case 6:
				xAngle = 90, yAngle = -180;
				break;
		}
	}

	function rotate() {
		myCube.style[cssTransformStyle] = 'rotateX(' + xAngle + 'deg) rotateY(' + yAngle + 'deg)';
	}

	function updateLinks(newFace) {
		for (var i = 0; i < mapLinks.length; i++) {
			if (i == (newFace - 1)) {
				_addClass(mapLinks[i], 'active');
			} else {
				_removeClass(mapLinks[i], 'active');
			}
		}
		currentFace = newFace;
	}

	init();
}

window['cube'] = cube; // prevents Closure from unused code removal