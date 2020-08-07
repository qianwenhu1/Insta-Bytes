"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDTOtoPostConvertor = void 0;
function PostDTOtoPostConvertor(pdto) {
    return {
        postId: pdto.post_id,
        userId: pdto.user_id,
        image: pdto.image,
        caption: pdto.caption,
        location: pdto.location,
        date: pdto.date
    };
}
exports.PostDTOtoPostConvertor = PostDTOtoPostConvertor;
//# sourceMappingURL=postDTO-to-post-convertor.js.map