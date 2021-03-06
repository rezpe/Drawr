## Summary

This library permits you to build a canvas where users can draw

## How to use

You use function 'createDrawr' to create a jquery object containing the canvas

```javascript
$drawr = createDrawr(600,600).appendTo("body")
```

Then you can set css and attr like in normal jquery objects

```javascript
$drawr.css({position:"absolute",left:0,top:0})
```

## Events

There are 3 events that are triggered

* *start*: When you start drawing (mouse Down)
* *drawing*: While you are drawing (mouse Move)
* *endpath*: When you end drawing (mouse Up)

For example:

```javascript
$drawr.bind("endpath",function(evt,x,y){
        points = $(this).data("list")
        createShape(points)
})
```

## Data

Using the key "list", one can access the array of points of drawn path

```javascript
points = $(this).data("list")
```
