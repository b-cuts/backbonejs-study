/*global define*/
'use strict';

define([], function () {
    return {
        // Which filter are we using?
        TodoFilter: '', // ?filter=all, ?filter=active, ?filter=completed

        // What is the enter key constant?
        ENTER_KEY: 13,
        ESCAPE_KEY: 27
    };
});