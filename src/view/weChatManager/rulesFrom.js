export function ProdNo(_this,title) {
     return {
          required: true,
          message: title,
          trigger: "change",
          validator: (rules, value, callback) => {
               if (!_this.ruleForm.ProdNo) {
                    callback(new Error(title));
               } else {
                    callback();
               }
          }
     }
}
export function ProdNoChildren() {
     return {
          required: true,
          message: "商品编号未填",
          trigger: "change",
          validator: (rules, value, callback) => {
               if (!value) {
                    callback(new Error("商品编号未填"));
               } else {
                    callback();
               }
          }
     }
}
export function NameChildren() {
     return {
          required: true,
          message: "规格名称未填",
          trigger: "blur",
          validator: (rules, value, callback) => {
               if (!value) {
                    callback(new Error("规格名称未填"));
               } else {
                    callback();
               }
          }
     }
}
export function Name(_this) {
     return {
          required: true,
          message: "商品名称未填",
          trigger: "blur",
          validator: (rules, value, callback) => {
               if (!_this.ruleForm.Name) {
                    callback(new Error("商品名称未填"));
               } else {
                    callback();
               }
          }
     }
}
export function StoreQty(_this) {
     return {
          required: true,
          message: "商品库存",
          trigger: "blur",
          validator: (rules, value, callback) => {
               if (!value) {
                    callback(new Error("商品库存未填"));
               } else {
                    callback();
               }
          }
     }
}
export function CateSID(_this) {
     return {
          required: true,
          validator: (rules, value, callback) => {
               if (
                    !_this.ruleForm.CateSID ||
                    _this.ruleForm.CateSID.length === 0
               ) {
                    callback(new Error("请选择商品类别"));
               } else {
                    callback();
               }
          }
     }
}
export function ShopInfo(_this) {
     return {
          required: true,
          validator: (rules, value, callback) => {
               if (!_this.ruleForm.ShopInfo) {
                    callback(new Error("供货门店"));
               } else {
                    callback();
               }
          }
     }
}