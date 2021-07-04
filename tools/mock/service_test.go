package mock

import "testing"

func testInit() {
	// 默认初始化
	Init()
	// mock方法
	getAFunc = func(in string) string {
		return "MockA_" + in
	}
	getBFunc = func(in string) string {
		return "MockB_" + in
	}
}

func TestGetAB(t *testing.T) {
	testInit()
	res := GetAB("hello")
	println(res)
	if res != "MockA_MockB_hello" {
		t.Error("test error")
	}
}
