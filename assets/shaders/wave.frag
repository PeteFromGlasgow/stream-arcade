
precision mediump float;

uniform vec2      resolution;
uniform float     time;

#define PI 90

void main( void ) {
    
    vec2 p = ( gl_FragCoord.xy / resolution.xy ) - (0.0);
    float sx = 0.5 + 0.5 * sin( 100.0 * p.x + 1. * pow(time, 0.5)*5.) * sin( 5.0 * p.x + 1. * pow(time, 0.5)*2.);
    sx = sx * -2.5;
    float dy = 1.0/ ( 300. * abs(p.y - sx));
    
    dy += 1./ (25. * length(p - vec2(p.x, 0.)));

    gl_FragColor = vec4(dy,((p.x ) * dy)+0.3, (0.5 * dy)+0.3, 1.1 );
}