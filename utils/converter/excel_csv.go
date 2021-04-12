package converter

import (
	"encoding/csv"
	"fmt"
	"github.com/360EntSecGroup-Skylar/excelize"
	"io"
	"strings"
)

func CsvToMap(reader io.Reader) (records []map[string]interface{}) {
	r := csv.NewReader(reader)
	rows, err := r.ReadAll()
	if err != nil {
		fmt.Println(err)
		return
	}
	if len(rows) < 2 {
		fmt.Println("empty data row")
		return
	}

	return RowsToMap(rows)
}

func ExcelToMap(reader io.Reader) (records []map[string]interface{}) {
	xlsx, err := excelize.OpenReader(reader)
	if err != nil {
		fmt.Println(err)
		return
	}
	sheetMap := xlsx.GetSheetMap()
	var rows [][]string
	for _, name := range sheetMap {
		rows = append(rows, xlsx.GetRows(name)...)
	}
	if len(rows) < 2 {
		fmt.Println("empty data row")
		return
	}

	return RowsToMap(rows)
}

func RowsToMap(rows [][]string) (records []map[string]interface{}) {
	if len(rows) < 2 {
		fmt.Println("empty data row")
		return
	}

	headers := []string{}
	for i, value := range rows[0] {
		if i == 0 { // 去掉utf8的bom
			value = strings.Replace(value, "\xEF\xBB\xBF", "", 1)
		}
		if len(value) > 0 {
			headers = append(headers, value)
		}
	}

	headerLen := len(headers)
	if headerLen < 1 {
		fmt.Println("empty headers")
		return
	}

	for _, row := range rows[1:] {
		if len(row) < 1 {
			continue
		}
		record := map[string]interface{}{}
		for i, value := range row {
			if i < headerLen {
				header := headers[i]
				record[header] = value
			}
		}
		records = append(records, record)
	}
	return
}
