var hoverDiv = document.createElement('div');
hoverDiv.id = 'hover';

// Create the <button> element with the class "add"
var addButton = document.createElement('button');
addButton.className = 'add';
addButton.textContent = '+';

// Append the <button> element to the <div> element
hoverDiv.appendChild(addButton);

// Append the <div> element to the <body> element
document.body.appendChild(hoverDiv);

let scale_num = 1;
/*const position = { x: 0, y: 0 }

interact('.draggable').draggable({
    manualStart: true,
    allowFrom: '.handle'
}).on('move', function (event) {
    var interaction = event.interaction

    // if the pointer was moved while being held down
    // and an interaction hasn't started yet
    //CHECK PARENT OF THIS FIELD IF IT IS ALREADY DROPPED THEN DO NOT CREATE CLONE INSTEAD JUST MOVE IT 


    //ADD THE ELEMENT TO DROPPED AREA AND CREATE THE CLONE
    if (interaction.pointerIsDown && !interaction.interacting()) {
        var original = event.currentTarget,
            // create a clone of the currentTarget element
            clone = event.currentTarget.cloneNode(true);

            listeners: {
                start (event) {
                  console.log(event.type, event.target)
                }
            }

        // insert the clone to the page
        // TODO: position the clone appropriately
        document.getElementById("page1").appendChild(clone)

        // start a drag interaction targeting the clone
        interaction.start({ name: 'drag' }, event.interactable, clone)
    }
})
*/


/*
// This stores the position of the current item being dragged
const position = { x: 0, y: 0 };

interact(".fieldItem")
  .draggable({
    // By setting manualStart to true - we control the manualStart.
    // We need to do this so that we can clone the object before we begin dragging it.
    manualStart: true,
    listeners: {
      move(event) {
        position.x += event.dx;
        position.y += event.dy;
        //event.target.style.top = position.x;
        //event.target.style.left = position.y;
        event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
        console.log("LISTENERS MOVEING LNIE 72:::: ", `${position.x} px,  ---  ${position.y}px`);
      }
    }
  })
  // This only gets called when we trigger it below using interact.start(...)
  .on("move", function(event) {
    const { currentTarget, interaction } = event;
    let element = currentTarget;

    // If we are dragging an item from the sidebar, its transform value will be ''
    // We need to clone it, and then start moving the clone
    if (
      interaction.pointerIsDown &&
      !interaction.interacting() &&
      currentTarget.style.transform === ""
    ) {
      element = currentTarget.cloneNode(true);

      // Add absolute positioning so that cloned object lives right on top of the original object
      element.style.position = "absolute";
      element.style.left = 0;
      element.style.top = 0;

      // Add the cloned object to the document
      
      //const container = document.querySelector(".container");
      //container && container.appendChild(element);

      document.getElementById("page1").appendChild(element)

      const { offsetTop, offsetLeft } = currentTarget;
      position.x = offsetLeft;
      position.y = offsetTop;

      // If we are moving an already existing item, we need to make sure the position object has
      // the correct values before we start dragging it
    } else if (interaction.pointerIsDown && !interaction.interacting()) {
      const regex = /translate\(([\d]+)px, ([\d]+)px\)/i;
      const transform = regex.exec(currentTarget.style.transform);

      if (transform && transform.length > 1) {
        position.x = Number(transform[1]);
        position.y = Number(transform[2]);
      }
    }

    // Start the drag event
    interaction.start({ name: "drag" }, event.interactable, element);
  });
*/


/**VERSION 3 WHICH IS BETTER THAN VERSION 1 AND 2 */

/*
interact('.fieldItem').draggable({
    inertia: true,
    restrict: {
        restriction: "#visualizer-panel",
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    onmove: function (event) {
        var target = event.target;
        var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
        var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        //target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

        target.style.top = y + "px";
        target.style.left = x + "px";

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    },
    onend: function (event) {
        console.log(event);
    }
}).on('move', function (event) {
    var interaction = event.interaction;
    if (interaction.pointerIsDown && !interaction.interacting() && event.currentTarget.getAttribute('clonable') != 'false') {
        var original = event.currentTarget;
        var clone = event.currentTarget.cloneNode(true);
        var x = clone.offsetLeft;
        var y = clone.offsetTop;
        clone.setAttribute('clonable', 'false');
        clone.style.position = "absolute";
        clone.style.left = original.offsetLeft + "px";
        clone.style.top = original.offsetTop + "px";
        original.parentElement.appendChild(clone);
        //document.getElementById("page1").appendChild(clone);
        interaction.start({ name: 'drag' }, event.interactable, clone);
    }
});
*/


/**versin 4 */


// target elements with the "draggable" class
interact('.fieldItem')
    .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        restrict: {
            //restriction: "parent",
            endOnly: true,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        // enable autoScroll
        autoScroll: true,
        listeners: {
            start (event) {
                if(!event.target.parentElement.className?.includes('droppable')) event.target.classList.add('is_draging');
            },
        },
        // call this function on every dragmove event
        onmove: dragMoveListener,
        // call this function on every dragend event
        onend: function (event) {
            var textEl = event.target.querySelector('p');

            textEl && (textEl.textContent =
                'moved a distance of '
                + (Math.sqrt(event.dx * event.dx +
                    event.dy * event.dy) | 0) + 'px');
        },
    }).on('move', function (event) {
        var interaction = event.interaction;
        if (interaction.pointerIsDown && !interaction.interacting() && event.currentTarget.getAttribute('clonable') != 'false') {
            var original = event.currentTarget;
            var clone = event.currentTarget.cloneNode(true);
            var x = clone.offsetLeft;
            var y = clone.offsetTop;
            clone.setAttribute('clonable', 'false');
            clone.style.position = "absolute";
            clone.style.left = original.offsetLeft + "px";
            clone.style.top = original.offsetTop + "px";
            original.parentElement.appendChild(clone);
            console.log(` original.offsetLeft:: ${original.offsetLeft}   ---- line 192`);
            //document.getElementById("page1").appendChild(clone);
            interaction.start({ name: 'drag' }, event.interactable, clone);
        }
    })

function dragMoveListener(event) {
    console.log('event')
    let scale_number = 1;
    event.target.className?.includes('is_draging') ? scale_number = 1 : event.target.className?.includes('can-drop') ? scale_number = scale_num : null;
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || target.getBoundingClientRect().left - 16) + event.dx / scale_number,
        y = (parseFloat(target.getAttribute('data-y')) || target.getBoundingClientRect().top - 19 - target.clientHeight / 2) + event.dy / scale_number;

    // translate the element
    /* target.style.webkitTransform =
         target.style.transform =
         'translate(' + x + 'px, ' + y + 'px)';
 */
    target.style.left = x + "px";
    target.style.top = y + "px";
    //console.log("dragMoveListener :::: " , ` X: ${x}   - Y ${y}`)
    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;

// enable draggables to be dropped into this
interact('.droppable').dropzone({
    // only accept elements matching this CSS selector
    //accept: '#yes-drop',
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.75,

    // listen for drop related events:

    ondropactivate: function (event) {
        // add active dropzone feedback
        event.target.classList.add('drop-active');
    },
    ondragenter: function (event) {
        var draggableElement = event.relatedTarget,
            dropzoneElement = event.target;

        // feedback the possibility of a drop
        dropzoneElement.classList.add('drop-target');
        draggableElement.classList.add('can-drop');
        if(!draggableElement.className.includes('radio')) draggableElement.textContent = 'Dragged in';
    },
    ondragleave: function (event) {
        // remove the drop feedback style
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');
        if(!event.relatedTarget.className.includes('radio')) event.relatedTarget.textContent = 'Dragged out';
    },
    ondrop: function (event, ui) {
        //event.relatedTarget.textContent = 'Dropped';
        var parent = event.target;

        // console.log("ui :::: ", ui);
        // console.log("event  line 253 ----------------------:::: ", event);
        updateParent(event.relatedTarget, event.target, "yes");
        event.relatedTarget.classList.remove('is_draging');
        if(event.relatedTarget.className.includes('radio')) {
            console.log('123123123')
            event.relatedTarget.querySelector('input[type="radio"]').setAttribute('name', 'r' + new Date().getTime());
        }
    },
    ondropdeactivate: function (event) {
        // remove active dropzone feedback
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-target');
        event.relatedTarget.style.margin = "0px";
        //  console.log("event line 261 ---------------------:::: ", event);
        //updateParent(event.relatedTarget, event.target , "yes" );
    }
});



//initialMove -> itel dragged from left menu to container/page
function updateParent(el, parent, initialMove) {
    console.log("ELEMENT::::: ", el);
    console.log("PARENT::::: ", parent);

    let parentId = parent.getAttribute("id");

    //EDITOR DROPABEL OFFSET
    editorLeftOffset = document.getElementById("editor_area").offsetLeft;   
    editorTopOffset = document.getElementById("editor_area").offsetTop;

    envelopeLeftOffset = document.getElementById("envelope").offsetLeft;
    envelopeTopOffset = document.getElementById("envelope").offsetTop;


    //check offset of parent 
    let parentLeftOffset = document.getElementById(parentId).offsetLeft;
    let parentTopOffset = document.getElementById(parentId).offsetTop;

    //check el left
    let fieldLeftOffset = el.offsetLeft;
    let fieldTopOffset = el.offsetTop;

    let selectedScale = document.getElementById("envelope_size_label").getAttribute("data-selected-scale-size");
    let scalingSize = selectedScale === "fit" ? (document.getElementById("editor_area").offsetWidth - 20) / document.getElementById("envelope").getAttribute("data-standard-size") : selectedScale;

    //GET ATTRIBUTE IF IT IS CLONABLE OR NOT
    let isFieldAlreadyDropped = el.parentElement.classList.contains('droppable') && el.parentElement.id === parent.id
    if (!isFieldAlreadyDropped) {
        //CASE: WHEN FIELD IS FIRST TIME DRAGGED AND DROPPED INTO THE PAGE
        let fieldNewLeft = el.parentElement.classList.contains('droppable') ? fieldLeftOffset : (fieldLeftOffset - (editorLeftOffset +envelopeLeftOffset)) - 5;    //calculate the field new left position after it is dragged - page has a margin of 5 and offset does not calculate margin so subtract manually
        fieldNewLeft = fieldNewLeft > 0 ? fieldNewLeft : 0;

        console.log('Scroll Y Height:', document.getElementById("editor_area").scrollTop);
        console.log('parentTopOffset', parentTopOffset)
        console.log("fieldLeftOffset", fieldLeftOffset);
        console.log("envelopeTopOffset", envelopeTopOffset);
        console.log("document.getElementsByClassName('droppable').clientHeight", document.getElementById('page1').offsetHeight);
        console.log("editorLeftOffset +envelopeLeftOffset ::: ", editorLeftOffset +envelopeLeftOffset);

        console.log('el.parentElement.offsetTop', el.parentElement.offsetTop)
        let fieldNewTop = el.parentElement.classList.contains('droppable') ? (fieldTopOffset < 0 ? el.parentElement.offsetTop + fieldTopOffset : fieldTopOffset) - (parentTopOffset > document.getElementById('page1').offsetHeight + envelopeTopOffset ? document.getElementById('page1').offsetHeight + envelopeTopOffset : parentTopOffset) - 5 : (fieldTopOffset - (parentTopOffset+envelopeTopOffset)) - 5 + document.getElementById("editor_area").scrollTop;
        console.log('fieldTopOffset', fieldTopOffset)
        console.log('fieldTopOffset', fieldTopOffset)
        console.log("parentTopOffset+envelopeTopOffset ::: ", parentTopOffset+envelopeTopOffset);
        fieldNewTop = fieldNewTop > 0 ? fieldNewTop : 0;

        el.style.left = fieldNewLeft;
        el.style.top = fieldNewTop;

        //UPDATE DATA X AND DAT -Y 
        el.setAttribute("data-x", fieldNewLeft);
        el.setAttribute("data-y", fieldNewTop);
        parent.appendChild(el);
    }
}


//LISTENS THE CHANGE FOR CONTAINR SIZE
const selectElement = document.querySelector("#envelope_size_label");
selectElement.addEventListener("change", (event) => {
    console.log(event.target.value); 
    document.getElementById("envelope_size_label").setAttribute("data-selected-scale-size", event.target.value);
   
    //UPDATE CONTAINER STYLING
    document.getElementById("envelope").style.transform = "scale("+event.target.value+")";
    scale_num = event.target.value;
});

// document.addEventListener('click', function(event) {
//     // Check if the clicked element has the 'radio' class name
//     if (event.target.classList.contains('radio') && event.target.classList.contains('can-drop')) {
//         // The clicked element has the 'radio' class name
//         console.log('Clicked element has the "radio" class.');
        
//         // You can perform your desired actions here
//     }
// });

function updateHoverBounds() {
    var rect = {
        left: 10000,
        top: 10000,
        right: 0,
        bottom: 0
    };

    // Get all input elements with a specific name attribute
    var inputElements = document.querySelectorAll('input[name="' + hoverDiv.getAttribute('data-name') + '"]');

    inputElements.forEach(function(input) {
        var el = input.parentElement;
        var offset = getOffset(el);
        rect = {
            left: Math.min(rect.left, offset.left),
            top: Math.min(rect.top, offset.top),
            right: Math.max(rect.right, offset.left + el.offsetWidth),
            bottom: Math.max(rect.bottom, offset.top + el.offsetHeight)
        };
    });

    // Apply calculated bounds to the hoveradd
    hoverDiv.style.left = rect.left + 'px';
    hoverDiv.style.top = rect.top + 'px';
    hoverDiv.style.width = (rect.right - rect.left) + 'px';
    hoverDiv.style.height = (rect.bottom - rect.top) + 'px';
}

// Function to calculate the offset of an element
function getOffset(el) {
    var rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}

document.addEventListener('click', function(e) {
    // Check if the clicked element has the class "add" within the "hover" element
    if (e.target.classList.contains('add') && e.target.closest('#hover')) {
        console.log('asdasdasdasdasdasdasdadasd', document.querySelector('input[name="' + hoverDiv.getAttribute('data-name') + '"]'))
        e.preventDefault();
        e.stopPropagation();

        // Find the last radio element in the group
        var radio_elements = document.querySelectorAll('input[name="' + hoverDiv.getAttribute('data-name') + '"]');
        var radio = radio_elements[radio_elements.length - 1].parentElement;
        console.log('radio', radio)

        // Clone it and append it to the same parent
        var el = radio.cloneNode(true);
        radio.parentElement.appendChild(el);

        var position = window.getComputedStyle(radio);
        console.log('position', position.getPropertyValue('top'))
        el.style.top = parseInt(position.getPropertyValue('top')) + radio.offsetHeight + 5;
        el.style.left = parseInt(position.getPropertyValue('left'));

        // Make it draggable
        interact(el).draggable({
            cursor: "move",
        });

        // We added a new element, so we have to update the hover bounds
        updateHoverBounds();
    }
});

document.addEventListener('click', function(e) {
    // Check if the clicked element has the class "radio" and is a descendant of an element with the class "droppable"
    if (e.target.classList.contains('radio') && e.target.closest('.droppable')) {
        // Check if the clicked element was exactly the radio element
        if (e.target.classList.contains('can-drop')) {
            // Find the name of the radio elements group to check if it is the current group for hover
            var name = e.target.querySelector('input').getAttribute('name');
            
            if (name == hoverDiv.getAttribute('data-name')) {
                // Toggle visibility if the group is the same
                hoverDiv.classList.add('visible');
            } else {
                // Save the new group name in hover's data and show it if the group was changed
                hoverDiv.setAttribute('data-name', name);
                hoverDiv.classList.add('visible');
            }
            
            // Update hover bounds to the actual group's one
            updateHoverBounds();
        }
    }
});

document.addEventListener("drag", function(event) {
    if (hoverDiv.classList.contains('visible')) {
        updateHoverBounds();
    }
});

// Event handler for the "dragend" event (equivalent to "dragstop")
document.addEventListener("dragend", function(event) {
    if (hoverDiv.classList.contains('visible')) {
        updateHoverBounds();
    }
});

// Event handler for the "scroll" event on elements with class "scroll"
document.querySelectorAll('.scroll').forEach(function(element) {
    element.addEventListener("scroll", function(event) {
        if (hoverDiv.classList.contains('visible')) {
            updateHoverBounds();
        }
    });
});

// Event handler for the "resize" event using ResizeObserver
var resizeObserver = new ResizeObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.target.classList.contains('droppable') && hoverDiv.classList.contains('visible')) {
            updateHoverBounds();
        }
    });
});

document.querySelectorAll('.droppable').forEach(function(element) {
    resizeObserver.observe(element);
});
