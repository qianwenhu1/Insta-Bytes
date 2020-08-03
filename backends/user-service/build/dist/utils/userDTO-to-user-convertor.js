"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDTOtoUserConvertor = void 0;
function UserDTOtoUserConvertor(udto) {
    return {
        userId: udto.user_id,
        username: udto.username,
        password: udto.password,
        firstName: udto.first_name,
        lastName: udto.last_name,
        email: udto.email,
        role: udto.role,
        image: udto.image,
        favoriteFood: udto.favorite_food,
        city: udto.city
    };
}
exports.UserDTOtoUserConvertor = UserDTOtoUserConvertor;
//# sourceMappingURL=userDTO-to-user-convertor.js.map