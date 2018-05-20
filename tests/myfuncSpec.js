describe("check array is right", function() {
  var arr1 = [1,2,3]
  var arr2 = []
  it("Two different Arrays", function() {
    expect(checkArrays(arr1,arr2)).toBe(false);
  });
  it("Two identique Arrays", function() {
    expect(checkArrays(arr1,arr1)).toBe(true);
  });
});


describe("check rgb2hex function", function() {
  var rgb = "(0, 51, 255)"
  it("return #0033ff", function () {
    expect(rgb2hex(rgb)).toBe("#0033ff");
  });
});


document.body.innerHTML = __html__['template/header.html'];
loadAssets('header');

describe('HTML template', function() {
    it('should expose the templates to __html__', function() {
      expect(document.getElementById('stream')).toBeDefined();
    });
});

describe("fliptostop change button value", function() {
    it("Push to stop", function() {
      fliptostop();
      expect(expect(btn_stream.value).toEqual("Stop"));
    });
    it("Push to start", function() {
      fliptostart();
      expect(btn_stream.value).toEqual("Stream");
    });
});

function appendCSS(path){
    var  link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href='css/'+ path;
    document.body.appendChild(link)
}
function appendScript(path){
    var  link = document.createElement('script');
    link.type = 'javascript';
    link.src='script/' + path;
    document.body.appendChild(link)
}    
function loadAssets(page){
    document.body.innerHTML = __html__['templates/' + (page || 'index') + '.html'];
    appendScript('myscript.js');
    appendScript('myfunc.js');
    appendCSS('style.css');
}
