window.cube = function( pageIndex ) {
    var transformProp;
    var currFaceIndex = pageIndex || 2;
    var xDegree;
    var yDegree;
    var doc = document;
    var mycube = doc.getElementById( 'mycube' );
    var mapNav = doc.getElementById( 'map' ).childNodes;
    var faceLinks = function( className ) {
        // check for pre-existings
        if ( doc.getElementsByClassName ) return doc.getElementsByClassName( className );
        if ( doc.querySelectorAll ) return doc.querySelectorAll( '.' + className );

        // otherwise, search manually
        var elements = [];
        className = RegExp( '(^| )' + className + '( |$)' );
        var allElements = doc.getElementsByTagName( '*' );
        for ( i = 0; i < allElements.length; i++) {
            var el = allElements[ i ];
            if ( className.test( el.className ) ) {
                elements.push( el );
            }
        }
        return elements;
    }( 'face-link' );

    var checkBrowser = function() {
        var style = doc.createElement( 'div' ).style;
        var perspectiveProps = 'perspectiveProperty WebkitPerspective MozPerspective OPerspective msPerspective'.split( ' ' );
        var transitionProps = 'transitionProperty WebkitTransitionProperty MozTransitionProperty OTransitionProperty msTransitionProperty KhtmlTransitionProperty'.split( ' ' );
        var transformProps = 'transform WebkitTransform MozTransform OTransform msTransform'.split( ' ' );

        // test for perspectives
        var supportsPerspective = false;
        for ( var i = 0; i < perspectiveProps.length; i++ ) {
            var prop = perspectiveProps[ i ];
            if ( style[ prop ] ) {
                supportsPerspective = true;
                break;
            }
        }

        if ( supportsPerspective && 'webkitPerspective' in doc.documentElement.style ) {
            var tempStyle = doc.createElement( 'style' );
            var tempDiv = doc.createElement( 'div' );
            var head = doc.head || doc.getElementsByTagName( 'head' )[ 0 ];
            var tempHeight = 3;

            // apply elements
            tempStyle.textContent = '@media (transform-3d),(-webkit-transform-3d),(-moz-transform-3d),(-o-transform-3d),(-ms-transform-3d),(-khtml-transform-3d),(modernizr){ #modernizr { height: ' + tempHeight + ' } }';
            tempDiv.id = 'modernizr';

            // append
            head.appendChild( tempStyle );
            doc.documentElement.appendChild( tempDiv );

            // check to see if height is what it should be
            if ( tempDiv.offsetHeight !== tempHeight ) {
                supportsPerspective = false;
            }
            // clean elements
            tempStyle.parentNode.removeChild( tempStyle );
            tempDiv.parentNode.removeChild( tempDiv );
        }

        // test for transitions
        var supportsTransition = false;
        for ( var i = 0; i < transitionProps.length; i++ ) {
            var prop = transitionProps[ i ];
            if ( style[ prop ] ) {
                supportsTransition = true;
                break;
            }
        }

        // test for transforms
        if ( supportsPerspective && supportsTransition ) {
            for ( var i = 0; i < transformProps.length; i++ ) {
                var prop = transformProps[ i ];
                if ( style[ prop ] ) {
                    transformProp = prop;
                    break;
                }
            }
        }
    };

    var updateXYDegrees = function( faceIndex ) {
        switch ( faceIndex ) {
            case 1:
                xDegree = -90;
                yDegree = 0;
                break;
            case 2:
                xDegree = yDegree = 0;
                break;
            case 3:
                xDegree = 0;
                yDegree = -90;
                break;
            case 4:
                xDegree = 0;
                yDegree = -180;
                break;
            case 5:
                xDegree = 0;
                yDegree = 90;
                break;
            case 6:
                xDegree = 90;
                yDegree = -180;
        }
    };

    var rotateCube = function() {
        mycube.style[ transformProp ] = 'rotateX(' + xDegree + 'deg) rotateY(' + yDegree + 'deg)';
    };

    checkBrowser();
    if ( transformProp ) {
        for ( var i = 0; i < faceLinks.length; i++ ) {
            var faceLink = faceLinks[ i ];
            faceLink.onclick = function( evt ) {
                // prevent default behavior
                evt.preventDefault();

                // get the data attribute
                var dataFaceIndex = 0;
                for ( var j = 0; j < this.attributes.length; j++ ) {
                    var attr = this.attributes[ j ];
                    if ( attr.name == 'data-face' ) {
                        dataFaceIndex = parseInt( attr.value );
                        break;
                    }
                }

                // check to see if it isn't the one we're currently on
                if ( dataFaceIndex != currFaceIndex ) {
                    // if so, let's update and rotate to it
                    updateXYDegrees( dataFaceIndex );
                    rotateCube();

                    // be sure to update our map links
                    for ( j = 0; j < mapNav.length; j++ ) {
                        var mapLink = mapNav[ j ];
                        if ( j == dataFaceIndex - 1 ) {
                            mapLink.className += ' active';
                        }
                        else {
                            mapLink.className = mapLink.className.replace( /(\s|^)active(\s|$)/ );
                        }
                    }

                    // update our tracker
                    currFaceIndex = dataFaceIndex;
                }
            };
        }
        updateXYDegrees( currFaceIndex );
        rotateCube();
    }
};