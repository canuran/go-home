package configdal

import (
	"context"
	"github.com/ewingtsai/go-web/common"
	"github.com/ewingtsai/go-web/config"
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"time"
)

const ConfigTable = "config"

type ConfigDO struct {
	Id        int64     `gorm:"autoIncrement;primaryKey" json:"id"`
	Config    string    `gorm:"uniqueIndex;size:64" json:"config"`
	Value     string    `gorm:"size:1024" json:"value"`
	Num       int64     `gorm:"column:num" json:"num"`
	Extra     string    `gorm:"size:1024" json:"extra"`
	CreatedAt time.Time `gorm:"column:created_at" json:"created_at"`
	UpdatedAt time.Time `gorm:"column:updated_at" json:"updated_at"`
}

func (do ConfigDO) TableName() string {
	return ConfigTable
}

func Init() {
	// 迁移 schema
	gormDB := config.GetDB(context.Background())
	common.LogIfErr(gormDB.AutoMigrate(&ConfigDO{}))
}

func GetConfig(ctx context.Context, configKey string) (*ConfigDO, error) {
	db := config.GetDB(ctx)
	do := &ConfigDO{}
	err := db.First(&do, &ConfigDO{Config: configKey}).Error
	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}
	if err != nil {
		log.Errorf("GetConfig err:%s", err.Error())
		return nil, err
	}
	return do, nil
}

func SaveConfig(ctx context.Context, configDO *ConfigDO) error {
	if configDO == nil || len(configDO.Config) < 1 {
		return nil
	}
	db := config.GetDB(ctx)
	err := db.Clauses(config.ConflictUpdateAll).
		Create(configDO).Error
	if err != nil {
		log.Errorf("SaveConfig err:%s", err.Error())
		return err
	}
	return nil
}

func UpdateConfigNotEmpty(ctx context.Context, configDO *ConfigDO) error {
	if configDO == nil || len(configDO.Config) < 1 {
		return nil
	}
	db := config.GetDB(ctx)
	err := db.Table(ConfigTable).
		Where("`config` = ?", configDO.Config).
		Updates(configDO).Error
	if err != nil {
		log.Errorf("UpdateConfigNotEmpty err:%s", err.Error())
		return err
	}
	return nil
}
