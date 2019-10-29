(function(root){

    var WordCount = function() {
    };
    
     // THIS METHOD IS TO TAKE IN THE TEXT FILE

     //selector: String, - The ID selector for a file input element.
     //callback: Function, - Called after a file is available and the number of words have been calculated.

    WordCount.words = function(selector, callback) {
        addFileChangeListener(selector, function(file) {
           var reader = new FileReader() ;
           reader.onload = function(e) {
             if (e.target.readyState === 2) {
                 var text = e.target.result;
                 callback(WordCount.wordsInText(text), file, selector);
             }  
           };
           
           reader.readAsText(file);
        });
    };

    // THIS METHOD IS TO COUNT THE WORDS IN THE TEXT FILE 
    WordCount.wordsInText = function(text) {
        if (!text) {
            // There is no text.
            return 0;
        }

        text = text.trim(); // Clear ends.
        var split = text.split(/\s+/g);
        if (split.length === 1) {
            if (split[0].trim() === '') {
                return 0;
            } else {
                return 1;
            }
        } else {
            return split.length;
        }
    };

    /*
     * Schedules a "change" event listener on a file input element.
     * When the "change" event is fired, the callback is called for each
     * file that was supplied.
     */
    function addFileChangeListener(selector, callback) {
        var input = document.getElementById(selector);
        input.addEventListener("change", function(event) {
            var files = event.target.files;
            if (files != undefined) {
                for (var i = 0; i < files.length; i++) {
                    callback(files[i]);
                }
            }
        });
    };
    
    // Export the wc.js class to the world!
    if (typeof define !== 'undefined' && define.amd) {
        define(WordCount);
    } else if (typeof exports === 'object') {
        module.exports = WordCount;
    } else {
        root.WordCount = WordCount;
    }    
})(this);
