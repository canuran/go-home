package encoders

import (
	"encoding/csv"
	"fmt"
	"github.com/360EntSecGroup-Skylar/excelize"
	"io"
	"strconv"
	"strings"
)

func CsvToMap(reader io.Reader) (records []map[string]any) {
	r := csv.NewReader(reader)
	var rows [][]string
	for {
		row, err := r.Read()
		if err == io.EOF {
			break
		}
		if err == nil {
			rows = append(rows, row)
		} else {
			fmt.Println("csv to map error", err)
		}
	}

	if len(rows) < 2 {
		fmt.Println("empty data row")
		return
	}
	return RowsToMap(rows)
}

func ExcelToMap(reader io.Reader) (records []map[string]any) {
	xlsx, err := excelize.OpenReader(reader)
	if err != nil {
		fmt.Println(err)
		return
	}
	sheetMap := xlsx.GetSheetMap()
	for _, v := range sheetMap {
		rows := xlsx.GetRows(v)
		if len(rows) < 2 {
			fmt.Println("empty data row")
			return
		}
		return RowsToMap(rows)
	}
	return
}

func RowsToMap(rows [][]string) (records []map[string]any) {
	if len(rows) < 2 {
		fmt.Println("empty data row")
		return
	}

	headers := make([]string, 0, len(rows[0]))
	for i, value := range rows[0] {
		if i == 0 { // 去掉utf8的bom
			value = strings.Replace(value, "\xEF\xBB\xBF", "", 1)
		}
		if len(value) > 0 {
			headers = append(headers, value)
		} else {
			headers = append(headers, "{"+strconv.Itoa(i+1)+"}")
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
		record := map[string]any{}
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
