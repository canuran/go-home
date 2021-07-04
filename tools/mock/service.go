package mock

var (
	// 依赖
	getAFunc func(in string) string
	getBFunc func(in string) string
)

func Init() {
	// 注入依赖
	getAFunc = GetA
	getBFunc = GetB
}

func GetAB(in string) string {
	return getAFunc(getBFunc(in))
}
