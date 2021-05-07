# signature-js
java script plugin for draw signature on canvas

### demo
http://iccshome.thddns.net:3310/signature/demo.html

### sample code
```
<script src="src/signaturejs.js"></script>
<div id = "container" />
<script>
    var mySignature = new Signature({
        containerId: 'container',
    });
    
    mySignature.open();
    mySignature.clear();
    mySignature.getDataUrl();
<script>
```

### available and default options
```
   {
        autoOpen: false,
        closeButton: true,
        color: 'black',
        containerId: "",
        lineWidth: 1
        width: 400,
        height: 200,
   }