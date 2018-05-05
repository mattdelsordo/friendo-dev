/**
 * Contains code to interface the user display with the friendo code.
 */

let canvas;
let context;

$(document).ready(function() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    /**
     * TEST-SLIDER LISTENERS
     * Each slider should update the indicator with its value,
     * update the corresponding stat in the game state,
     * and save the game on a change event (when user lifts mouse)
     */
    $("#core-range").on({
        "input": function(e) {
            $("#core-num").html(this.value);
        },
        "change": function(e) {
            $("#core-num").html(this.value);
            setStat(STATS.CORE, this.value);
            saveGame();
        }
    });
    $("#arms-range").on({
        "input": function(e) {
            $("#arms-num").html(this.value);
        },
        "change": function(e) {
            $("#arms-num").html(this.value);
            setStat(STATS.ARM, this.value);
            saveGame();
        }
    });
    $("#legs-range").on({
        "input": function(e) {
            $("#legs-num").html(this.value);
        },
        "change": function(e) {
            $("#legs-num").html(this.value);
            setStat(STATS.LEG, this.value);
            saveGame();
        }
    });
    $("#sight-range").on({
        "input": function(e) {
            $("#sight-num").html(this.value);
        },
        "change": function(e) {
            $("#sight-num").html(this.value);
            setStat(STATS.SIGHT, this.value);
            saveGame();
        }
    });
    $("#hair-range").on({
        "input": function(e) {
            $("#hair-num").html(this.value);
        },
        "change": function(e) {
            $("#hair-num").html(this.value);
            setStat(STATS.HAIR, this.value);
            saveGame();
        }
    });
    $("#taste-range").on({
        "input": function(e) {
            $("#taste-num").html(this.value);
        },
        "change": function(e) {
            $("#taste-num").html(this.value);
            setStat(STATS.TASTE, this.value);
            saveGame();
        }
    });
    $("#dog-range").on({
        "input": function(e) {
            $("#dog-num").html(this.value);
        },
        "change": function(e) {
            $("#dog-num").html(this.value);
            setStat(STATS.DOG, this.value);
            saveGame();
        }
    });
    $("#meme-range").on({
        "input": function(e) {
            $("#meme-num").html(this.value);
        },
        "change": function(e) {
            $("#meme-num").html(this.value);
            setStat(STATS.MEME, this.value);
            saveGame();
        }
    });

    // handle hook marker toggle
    $('#hook-marker-toggle').change(toggleHookMarkers);

    // name inputs
    $('#friendo-name').focusout(function() {
        const content = this.value.trim();
        if (content) {
            friendoName = content;
            saveGame();
        }
    });
    $('#owner-name').focusout(function() {
        const content = this.value.trim();
        if (content) {
            ownerName = content;
            saveGame();
        }
    });

    // handle type togglers
    $('#type-picker input[type=radio]').change(function() {
        friendoType = this.value;
        saveGame();
    });

    // load friendo from JSON, if a game exists
    const storage = localStorage.getItem(STORAGE_TOKEN);
    if (storage) {
        friendoFromJSONString(storage);
        console.log(`Loaded ${storage}`);
        
        $("#core-range").val(statLevel[STATS.CORE]);
        $('#core-num').html(statLevel[STATS.CORE]);

        $("#legs-range").val(statLevel[STATS.LEG]);
        $('#legs-num').html(statLevel[STATS.LEG]);

        $("#arms-range").val(statLevel[STATS.ARM]);
        $('#arms-num').html(statLevel[STATS.ARM]);

        $("#sight-range").val(statLevel[STATS.SIGHT]);
        $('#sight-num').html(statLevel[STATS.SIGHT]);

        $("#hair-range").val(statLevel[STATS.HAIR]);
        $('#hair-num').html(statLevel[STATS.HAIR]);

        $("#taste-range").val(statLevel[STATS.TASTE]);
        $('#taste-num').html(statLevel[STATS.TASTE]);

        $("#dog-range").val(statLevel[STATS.DOG]);
        $('#dog-num').html(statLevel[STATS.DOG]);

        $("#meme-range").val(statLevel[STATS.MEME]);
        $('#meme-num').html(statLevel[STATS.MEME]);

        $('#hook-marker-toggle').prop('checked', showHooks);
    }

    // set names and type to defaults regardless of saved data
    $('#owner-name').val(ownerName);
    $('#friendo-name').val(friendoName);
    $(`#type-picker input[type=radio][value='${friendoType}']`).prop('checked', true);

    // draw game to the screen at some interval
    setInterval(function() {
        context.save(); // save and restore context to prevent colors from getting donged up
        context.clearRect(0,0,canvas.width, canvas.height);
        drawFriendo(context);
        context.restore();
    }, TICKRATE);
});