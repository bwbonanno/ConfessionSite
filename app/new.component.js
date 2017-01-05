"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var post_service_1 = require('./post.service');
var NewComponent = (function () {
    function NewComponent(postService) {
        this.postService = postService;
    } // Inject PostService
    // Get Posts on Init //
    NewComponent.prototype.ngOnInit = function () {
        this.getPosts();
    };
    // Get Posts from PostService //
    NewComponent.prototype.getPosts = function () {
        var _this = this;
        this.postService.getNewPosts().then(function (posts) { return _this.posts = posts; });
    };
    NewComponent = __decorate([
        core_1.Component({
            selector: 'new',
            providers: [post_service_1.PostService],
            template: "\n  <ul class=\"postsList\">\n    <li *ngFor='let post of posts'>\n      <post [post]=\"post\"></post>\n    </li>\n  </ul>\n  "
        }), 
        __metadata('design:paramtypes', [post_service_1.PostService])
    ], NewComponent);
    return NewComponent;
}());
exports.NewComponent = NewComponent;
//# sourceMappingURL=new.component.js.map