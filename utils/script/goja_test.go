package script

import (
	"fmt"
	"github.com/dop251/goja"
	"math"
	"testing"
)

const script = `
function filter(data) {
    if (!(data && data.detail)) {
        return false;
    }
    // 可使用内置对象
    var detail = JSON.parse(data.detail);
    return detail.type === "user";
}
`

func TestGoja(t *testing.T) {
	// 调用脚本里的方法
	vm := goja.New()
	val, _ := vm.RunString(script)
	row := map[string]interface{}{"detail": `{"type":"user"}`}
	_ = vm.Set("row", row)
	val, _ = vm.RunString("filter(row)")
	fmt.Printf("result: %v\n", val)

	// 导出为go方法更方便调用，效率更高
	vm = goja.New()
	val, _ = vm.RunString(script)
	var filter func(o interface{}) bool
	_ = vm.ExportTo(vm.Get("filter"), &filter)
	fmt.Printf("filter: %v\n", filter(row))

	// 使用结构体参数
	vm.SetFieldNameMapper(goja.
		TagFieldNameMapper("json", true))
	fmt.Printf("filter: %v\n", filter(struct {
		Detail string `json:"detail"`
	}{Detail: `{"type":"user"}`}))

	// 在js中使用go函数
	vm = goja.New()
	_ = vm.Set("goMax", math.Max)
	val, _ = vm.RunString("goMax(6,8)")
	fmt.Printf("goMax: %v\n", val)
}

func BenchmarkGoja(b *testing.B) {
	row := map[string]interface{}{"detail": `{"type":"user"}`}
	vm := goja.New()
	_, _ = vm.RunString(script)
	for i := 0; i < b.N; i++ {
		_ = vm.Set("row", row)
		_, _ = vm.RunString("filter(row)")
	}
}


func BenchmarkGojaFunc(b *testing.B) {
	row := map[string]interface{}{"detail": `{"type":"user"}`}
	filter := getFilterFunc()
	for i := 0; i < b.N; i++ {
		_ = filter(row)
	}
}

func getFilterFunc() func(o interface{}) bool {
	vm := goja.New()
	_, _ = vm.RunString(script)
	var filter func(o interface{}) bool
	_ = vm.ExportTo(vm.Get("filter"), &filter)
	return filter
}