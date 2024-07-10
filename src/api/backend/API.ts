/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/**
 * LoginUserInfoVO
 * 登录用户信息
 */
export interface APILoginUserInfoVO {
  /** 用户昵称 */
  nick_name?: string;
  /** 角色名称 */
  role_name?: string;
  /** 用户名 */
  user_name?: string;
  /** 用户权限 */
  user_permission?: Record<string, object>;
}

/** MasterData */
export interface APIMasterData {
  /** 标记 */
  flag?: string;
  /** 创建时间 */
  gmt_created?: string;
  /** 修改时间 */
  gmt_modified?: string;
  id?: number;
  /** 实施时间 */
  implementation_date?: string;
  /** 删除标识：0、否 1、是 */
  is_deleted?: number;
  /** 领域分类 */
  master_data_area_type?: string;
  /** 编码 */
  master_data_code?: string;
  /** 主数据标识ID */
  master_data_flag_id?: number;
  /** 数据类型 */
  master_data_type?: string;
  /** 标准级别 */
  master_standard_level?: string;
  /** 名称 */
  name?: string;
  /** 字段中文名 */
  name_cn?: string;
  /** 项目编码 */
  proj_code?: string;
  /** 发布时间 */
  release_time?: string;
  /** 标准文件 */
  standard_file?: string;
  /** 标准表id */
  standard_table_id?: string;
  /** 状态0、未发布 1、审核中 2、驳回 3、已发布 4、已弃用 */
  status?: string;
  /** 项目编码 */
  version?: string;
}

/** MasterDataDetail */
export interface APIMasterDataDetail {
  /** 描述 */
  description?: string;
  /** 字段类型 */
  field_type?: string;
  /** 标记 */
  flag?: string;
  /** 创建时间 */
  gmt_created?: string;
  /** 修改时间 */
  gmt_modified?: string;
  id?: number;
  /** 固定字段不传-删除标识：0、否 1、是 */
  is_deleted?: number;
  /** 字段长度 */
  length?: string;
  /** 主数据ID */
  master_data_id?: number;
  /** 字段名称 */
  name?: string;
  /** 字段中文名 */
  name_cn?: string;
  /** 项目编号 */
  proj_code?: string;
  /** 排序 */
  sort?: number;
  /** 版本号 */
  version?: string;
}

/** MasterDataReleaseParam */
export interface APIMasterDataReleaseParam {
  /** 主数据id */
  master_data_id?: string;
  /** 版本号 */
  version?: string;
}

/** MdmBssRng */
export interface APIMdmBssRng {
  /** 值域说明 */
  description?: string;
  /** 创建时间 */
  gmt_created?: string;
  /** 修改时间 */
  gmt_modified?: string;
  id?: number;
  /** 删除标识：0、否 1、是 */
  is_deleted?: number;
  /** 父级id */
  parent_id?: string;
  pk_id?: number;
  /** 项目编码 */
  proj_code?: string;
  /** 值域目录来源文件名称 */
  rng_cd?: string;
  /** 自定义内部统一值域目录编码，业务表对应值域的标准编码 */
  rng_dctnry_cd?: string;
  /** 值域目录名称 */
  rng_dctnry_nm?: string;
  /** 值域目录来源文件编码 */
  rng_nm?: string;
}

/** MdmRngDctnry */
export interface APIMdmRngDctnry {
  /** 代码标识 */
  code_identification?: string;
  /** 国家编码 */
  country_code?: string;
  /** 值域目录所属类型代码，1-基础值域目录；2-主数据值域目录 */
  dctnry_tp?: string;
  /** 全称 */
  full_name?: string;
  /** 创建时间 */
  gmt_created?: string;
  /** 修改时间 */
  gmt_modified?: string;
  id?: number;
  /** 实施时间 */
  implementation_date?: string;
  /**
   * 是否ai匹配
   * @example false
   */
  is_ai?: boolean;
  /** 删除标识：0、否 1、是 */
  is_deleted?: number;
  /** 值域目录来源文件名称 */
  orgnl_stdrd_nm?: string;
  /** 值域目录来源文件编码 */
  orgnl_stdrd_no?: string;
  pk_id?: number;
  /** 项目编码 */
  proj_code?: string;
  /** 标准类别名称 */
  range_category_name?: string;
  /** 发布单位 */
  release_organization?: string;
  /** 发布时间 */
  release_time?: string;
  /** 领域分类 */
  rng_area_type?: string;
  /** 自定义内部统一值域目录编码，业务表对应值域的标准编码 */
  rng_dctnry_cd?: string;
  /** 值域目录名称 */
  rng_dctnry_nm?: string;
  /** 级别 */
  rng_level?: string;
  /** 机构分类 */
  rng_organization?: string;
  /** 标准目录编码 */
  standard_dctnry_code?: string;
  /** 标准目录名称 */
  standard_dctnry_name?: string;
  /** 标准目录类型 */
  standard_dctnry_type?: string;
  /** 标准分类 */
  standard_type?: string;
  /** 类型 */
  type?: string;
}

/** OperateRecord */
export interface APIOperateRecord {
  /** 操作字段名 */
  field_name?: string;
  /** 操作字段id */
  field_name_id?: number;
  /** 创建时间 */
  gmt_created?: string;
  /** 修改时间 */
  gmt_modified?: string;
  id?: number;
  /** 删除标识：0、否 1、是 */
  is_deleted?: number;
  /** 更新说明 */
  operate_description?: string;
  /** 发布人 */
  operate_person?: string;
  pk_id?: number;
  /** 标准清单id */
  standard_dataset_id?: number;
  /** 操作表名 */
  table_name?: string;
  /** 操作表名id */
  table_name_id?: number;
}

/**
 * ProjStandardVO
 * 项目标准版本
 */
export interface APIProjStandardVO {
  /** 下发标准版本 */
  issued_version?: string;
  /** 标准标签列表 */
  lable_list?: string[];
  /** 项目当前版本 */
  proj_version?: string;
  /** 最近发布时间 */
  release_time?: string;
  /** 标准ID */
  standard_id?: number;
  /** 标准名称 */
  standard_name?: string;
  /** 状态：0、待接收  1、已接收 */
  status?: number;
  /** 最近版本更新说明 */
  update_description?: string;
  /** 所有版本列表 */
  version_list?: string[];
}

/**
 * ProjectVO
 * 项目列表返回参数
 */
export interface APIProjectVO {
  /** 项目ID(编辑时传) */
  id?: number;
  /** 项目编码 */
  proj_code?: string;
  /** 所属地区 */
  proj_district?: string;
  /** 项目名称 */
  proj_name?: string;
  /** 标准数量 */
  standard_count?: number;
}

/** ReleaseFieldDTO */
export interface APIReleaseFieldDTO {
  apply_label?: string;
  area_type?: string;
  assignment_description?: string;
  assignment_expression?: string;
  data_source?: string;
  data_type?: string;
  description?: string;
  field_type?: string;
  implementation_date?: string;
  in_prm_key?: string;
  is_index?: number;
  is_not_null?: number;
  length?: string;
  mdm_rng_dctnry_cd?: string;
  mdm_rng_dctnry_flag?: string;
  mdm_rng_dctnry_group_name?: string;
  mdm_rng_dctnry_id?: string;
  mdm_rng_dctnry_nm?: string;
  mdm_rng_dctnry_type?: string;
  name?: string;
  name_cn?: string;
  presentation_format?: string;
  proj_code?: string;
  quality_type?: string;
  release_organization?: string;
  release_time?: string;
  remark?: string;
  standard_code?: string;
  standard_dataset_id?: number;
  standard_field_id?: number;
  standard_full_name?: string;
  standard_identifier?: string;
  standard_label?: string;
  standard_level?: string;
  standard_table_id?: number;
  version?: string;
}

/** ReleaseParam */
export interface APIReleaseParam {
  /** 主数据id */
  master_data_id?: string;
  /** 更新说明 */
  release_description?: string;
  /** 标准清单id */
  standard_dataset_id?: string;
  /** 版本号 */
  version?: string;
}

/** ReleaseRangeDTO */
export interface APIReleaseRangeDTO {
  code_identification?: string;
  country_code?: string;
  dctnry_tp?: string;
  detail_list?: APIReleaseRangeDetailDTO[];
  full_name?: string;
  implementation_date?: string;
  is_ai?: boolean;
  orgnl_stdrd_nm?: string;
  orgnl_stdrd_no?: string;
  proj_code?: string;
  range_category_name?: string;
  release_organization?: string;
  release_time?: string;
  rng_area_type?: string;
  rng_dctnry_cd?: string;
  rng_dctnry_nm?: string;
  rng_level?: string;
  rng_organization?: string;
  standard_dctnry_code?: string;
  standard_dctnry_name?: string;
  standard_dctnry_type?: string;
  standard_type?: string;
  type?: string;
}

/** ReleaseRangeDetailDTO */
export interface APIReleaseRangeDetailDTO {
  description?: string;
  parent_id?: number;
  proj_code?: string;
  rng_cd?: string;
  rng_dctnry_cd?: string;
  rng_dctnry_nm?: string;
  rng_nm?: string;
}

/** ReleaseRecord */
export interface APIReleaseRecord {
  /** 对比内容 */
  context?: string;
  /** 创建时间 */
  gmt_created?: string;
  /** 修改时间 */
  gmt_modified?: string;
  id?: number;
  /** 删除标识：0、否 1、是 */
  is_deleted?: number;
  is_uploaded?: number;
  pk_id?: number;
  /** 项目编码 */
  proj_code?: string;
  /** 发布说明 */
  release_description?: string;
  /** 发布人 */
  release_person?: string;
  /** 最新发布时间 */
  release_time?: string;
  standard_dataset_id?: number;
  /** 版本号 */
  version?: string;
  /** 上个版本号 */
  version_old?: string;
}

/** ReleaseRecordDTO */
export interface APIReleaseRecordDTO {
  context?: string;
  is_uploaded?: number;
  proj_code?: string;
  release_description?: string;
  release_person?: string;
  release_time?: string;
  standard_dataset_id?: number;
  version?: string;
  version_old?: string;
}

/** ReleaseStandardDTO */
export interface APIReleaseStandardDTO {
  data_warehouse?: string;
  proj_code?: string;
  range_list?: APIReleaseRangeDTO[];
  release_record?: APIReleaseRecordDTO;
  release_time?: string;
  standard_description?: string;
  standard_id?: number;
  standard_name?: string;
  table_list?: APIReleaseTableDTO[];
  type?: number;
  version?: string;
}

/** ReleaseTableDTO */
export interface APIReleaseTableDTO {
  data_source?: string;
  description?: string;
  field_list?: APIReleaseFieldDTO[];
  level?: string;
  name?: string;
  name_cn?: string;
  national_standard_dataset?: string;
  proj_code?: string;
  release_time?: string;
  standard_dataset_id?: number;
  standard_dataset_name?: string;
  standard_table_id?: number;
  type?: string;
  version?: string;
}

/** Result */
export interface APIResult {
  code?: string;
  data?: object;
  message?: string;
  time?: string;
}

/** Result«List«ProjStandardVO»» */
export interface APIResultListProjStandardVO {
  code?: string;
  data?: APIProjStandardVO[];
  message?: string;
  time?: string;
}

/** Result«List«ProjectVO»» */
export interface APIResultListProjectVO {
  code?: string;
  data?: APIProjectVO[];
  message?: string;
  time?: string;
}

/** Result«List«SkbCatalogVO»» */
export interface APIResultListSkbCatalogVO {
  code?: string;
  data?: APISkbCatalogVO[];
  message?: string;
  time?: string;
}

/** Result«List«SkbCustomLabelVO»» */
export interface APIResultListSkbCustomLabelVO {
  code?: string;
  data?: APISkbCustomLabelVO[];
  message?: string;
  time?: string;
}

/** Result«List«SkbDocumentInfoVO»» */
export interface APIResultListSkbDocumentInfoVO {
  code?: string;
  data?: APISkbDocumentInfoVO[];
  message?: string;
  time?: string;
}

/** Result«List«SkbLinkedDataVO»» */
export interface APIResultListSkbLinkedDataVO {
  code?: string;
  data?: APISkbLinkedDataVO[];
  message?: string;
  time?: string;
}

/** Result«List«SkbLinkedMasterDataVO»» */
export interface APIResultListSkbLinkedMasterDataVO {
  code?: string;
  data?: APISkbLinkedMasterDataVO[];
  message?: string;
  time?: string;
}

/** Result«List«SkbLinkedRangeCatalogVO»» */
export interface APIResultListSkbLinkedRangeCatalogVO {
  code?: string;
  data?: APISkbLinkedRangeCatalogVO[];
  message?: string;
  time?: string;
}

/** Result«List«SkbLinkedRangeDictionaryVO»» */
export interface APIResultListSkbLinkedRangeDictionaryVO {
  code?: string;
  data?: APISkbLinkedRangeDictionaryVO[];
  message?: string;
  time?: string;
}

/** Result«List«SkbLinkedStandardTableVO»» */
export interface APIResultListSkbLinkedStandardTableVO {
  code?: string;
  data?: APISkbLinkedStandardTableVO[];
  message?: string;
  time?: string;
}

/** Result«List«SkbLinkedStandardVO»» */
export interface APIResultListSkbLinkedStandardVO {
  code?: string;
  data?: APISkbLinkedStandardVO[];
  message?: string;
  time?: string;
}

/** Result«List«StandardVO»» */
export interface APIResultListStandardVO {
  code?: string;
  data?: APIStandardVO[];
  message?: string;
  time?: string;
}

/** Result«List«StdVersionVO»» */
export interface APIResultListStdVersionVO {
  code?: string;
  data?: APIStdVersionVO[];
  message?: string;
  time?: string;
}

/** Result«LoginUserInfoVO» */
export interface APIResultLoginUserInfoVO {
  code?: string;
  /** 登录用户信息 */
  data?: APILoginUserInfoVO;
  message?: string;
  time?: string;
}

/** Result«MasterDataDetail» */
export interface APIResultMasterDataDetail {
  code?: string;
  data?: APIMasterDataDetail;
  message?: string;
  time?: string;
}

/** Result«MasterData» */
export interface APIResultMasterData {
  code?: string;
  data?: APIMasterData;
  message?: string;
  time?: string;
}

/** Result«MdmBssRng» */
export interface APIResultMdmBssRng {
  code?: string;
  data?: APIMdmBssRng;
  message?: string;
  time?: string;
}

/** Result«MdmRngDctnry» */
export interface APIResultMdmRngDctnry {
  code?: string;
  data?: APIMdmRngDctnry;
  message?: string;
  time?: string;
}

/** Result«OperateRecord» */
export interface APIResultOperateRecord {
  code?: string;
  data?: APIOperateRecord;
  message?: string;
  time?: string;
}

/** Result«ReleaseRecord» */
export interface APIResultReleaseRecord {
  code?: string;
  data?: APIReleaseRecord;
  message?: string;
  time?: string;
}

/** Result«StandardDataset» */
export interface APIResultStandardDataset {
  code?: string;
  data?: APIStandardDataset;
  message?: string;
  time?: string;
}

/** Result«UploadDocVO» */
export interface APIResultUploadDocVO {
  code?: string;
  /** 文档上传返回参数 */
  data?: APIUploadDocVO;
  message?: string;
  time?: string;
}

/** Result«boolean» */
export interface APIResultBoolean {
  code?: string;
  data?: boolean;
  message?: string;
  time?: string;
}

/** Result«string» */
export interface APIResultString {
  code?: string;
  data?: string;
  message?: string;
  time?: string;
}

/**
 * SkbCatalogVO
 * 标准目录返回参数
 */
export interface APISkbCatalogVO {
  /** 目录ID */
  id?: number;
  /** 目录名称 */
  name?: string;
  /** 目录下的分类列表 */
  skb_group_list?: APISkbGroupVO[];
  /** 标签类型：0、目录 1、分类 2、自定义 */
  type?: number;
}

/**
 * SkbCustomLabelVO
 * 自定义标签
 */
export interface APISkbCustomLabelVO {
  /** 标签ID */
  id?: number;
  /** 标签名称 */
  name?: string;
}

/**
 * SkbDataInfoParam
 * 关联数据信息参数
 */
export interface APISkbDataInfoParam {
  /** 关联数据ID */
  data_id?: string;
  /** 关联数据名称 */
  data_name?: string;
  /** 数据类型：0、标准数据清单 1、主数据 2、值域 */
  data_type?: number;
}

/**
 * SkbDocLabelSaveParam
 * 文档标签保存参数
 */
export interface APISkbDocLabelSaveParam {
  /** 自定义标签列表 */
  custom_label_list?: APISkbLabelInfoParam[];
  /** 文档ID */
  doc_id?: number;
  /** 标签类型：0、目录 1、分类 2、自定义 */
  label_type?: number;
}

/**
 * SkbDocSaveParam
 * 标准文档保存参数
 */
export interface APISkbDocSaveParam {
  /** 标准号 */
  code?: string;
  /** 自定义标签列表 */
  custom_label_list?: APISkbLabelInfoParam[];
  /** 发布时间 */
  fb_time?: string;
  /** 分类体系标签列表 */
  group_label_map?: Record<string, string[]>;
  /** 文档ID(修改时必传) */
  id?: number;
  /** 关联数据列表 */
  linked_data_list?: APISkbDataInfoParam[];
  /** 文档名称 */
  name?: string;
  /** 实施时间 */
  ss_time?: string;
  /** 文件路径 */
  url?: string;
}

/**
 * SkbDocumentInfoVO
 * 文档详情信息
 */
export interface APISkbDocumentInfoVO {
  /** 标准号 */
  code?: string;
  /** 自定义标签列表 */
  custom_label_list?: APISkbCustomLabelVO[];
  /** 文档状态：0、待发布 1、即将发布 2、即将实施 3、现行 4、废止 */
  doc_state?: number;
  /** 发布时间 */
  fb_time?: string;
  /** 分类体系标签 */
  group_label_map?: Record<string, string[]>;
  /** 文档ID */
  id?: number;
  /** 关联数据列表 */
  linked_data_list?: APISkbLinkedDataVO[];
  /** 文档名称 */
  name?: string;
  /** 实施时间 */
  ss_time?: string;
  /** 预览下载路径 */
  svc_url?: string;
  /** 文件路径 */
  url?: string;
}

/**
 * SkbGroupVO
 * 标准分类返回参数
 */
export interface APISkbGroupVO {
  /** 子节点列表 */
  child_list?: APISkbGroupVO[];
  /** 所属目录ID */
  dir_id?: number;
  /** 不可编辑标志：0、否 1、是 */
  edit_flag?: number;
  /** 分类ID */
  id?: number;
  /** 分类名称 */
  name?: string;
  /** 分类父级ID */
  parent_id?: number;
  /** 标签类型：0、目录 1、分类 2、自定义 */
  type?: number;
}

/**
 * SkbLabelInfoParam
 * 标签信息参数
 */
export interface APISkbLabelInfoParam {
  /** 标签ID */
  id?: number;
  /** 标签名称 */
  name?: string;
}

/**
 * SkbLabelSaveParam
 * 保存标准标签
 */
export interface APISkbLabelSaveParam {
  /** 目录ID（分类标签必填） */
  dir_id?: number;
  /** 标签ID(编辑时必传) */
  id?: number;
  /** 标签名称 */
  name?: string;
  /** 父级ID */
  parent_id?: number;
  /** 标签类型：0、目录 1、分类 2、自定义 */
  type?: number;
}

/**
 * SkbLinkedDataVO
 * 关联数据信息
 */
export interface APISkbLinkedDataVO {
  /** 关联数据ID */
  data_id?: string;
  /** 关联数据名称 */
  data_name?: string;
  /** 数据类型：0、标准数据清单 1、主数据 2、值域 */
  data_type?: number;
}

/**
 * SkbLinkedMasterDataVO
 * 关联主数据
 */
export interface APISkbLinkedMasterDataVO {
  /** 主数据ID */
  id?: number;
  /** 实施时间 */
  implementation_date?: string;
  /** 领域分类 */
  master_data_area_type_name?: string;
  /** 编码 */
  master_data_code?: string;
  /** 数据类型 */
  master_data_type_name?: string;
  /** 标准级别 */
  master_standard_level_name?: string;
  /** 名称 */
  name?: string;
  /** 英文名 */
  name_en?: string;
  /** 发布时间 */
  release_time?: string;
  /** 版本号 */
  version?: string;
}

/**
 * SkbLinkedRangeCatalogVO
 * 关联值域/主数据分组
 */
export interface APISkbLinkedRangeCatalogVO {
  /** 值域/主数据目录ID */
  id?: string;
  /** 值域/主数据目录名称 */
  name?: string;
  /** 值域/主数据分类 */
  type_list?: APISkbLinkedRangeGroupVO[];
}

/**
 * SkbLinkedRangeDictionaryVO
 * 关联值域字典
 */
export interface APISkbLinkedRangeDictionaryVO {
  /** 实施时间 */
  implementation_date?: string;
  /** 发布单位 */
  release_organization?: string;
  /** 发布时间 */
  release_time?: string;
  /** 领域分类 */
  rng_area_type_name?: string;
  /** 值域字典编码 */
  rng_dctnry_cd?: string;
  /** 值域字典名称 */
  rng_dctnry_nm?: string;
  /** 标准级别 */
  rng_level_name?: string;
  /** 机构分类 */
  rng_organization_name?: string;
}

/**
 * SkbLinkedRangeGroupVO
 * 关联值域/主数据分类
 */
export interface APISkbLinkedRangeGroupVO {
  /** 值域/主数据分类ID */
  id?: number;
  /** 值域/主数据分类名称 */
  name?: string;
}

/**
 * SkbLinkedStandardTableVO
 * 关联标准清单表信息
 */
export interface APISkbLinkedStandardTableVO {
  /** 数据来源 */
  data_source?: string;
  /** 描述 */
  description?: string;
  /** 表ID */
  id?: number;
  /** 优先级 */
  level?: string;
  /** 表名 */
  name?: string;
  /** 表中文名 */
  name_cn?: string;
  /** 国标数据集 */
  national_standard_dataset?: string;
}

/**
 * SkbLinkedStandardVO
 * 关联标准清单信息
 */
export interface APISkbLinkedStandardVO {
  /** 标准ID */
  id?: number;
  /** 标准名称 */
  name?: string;
  /** 分类目录 */
  type_list?: string[];
  /** 标准版本 */
  version?: string;
}

/** StandardDataset */
export interface APIStandardDataset {
  /** 使用数仓 */
  data_warehouse?: string;
  /** 创建时间 */
  gmt_created?: string;
  /** 修改时间 */
  gmt_modified?: string;
  id?: number;
  /** 删除标识：0、否 1、是 */
  is_deleted?: number;
  /** 标准标签列表 */
  lable_list?: string[];
  /** 最新操作日志 */
  operate_log?: string;
  pk_id?: number;
  /** 最后发布人 */
  release_person?: string;
  /** 发布状态：0、否 1、是 */
  release_status?: number;
  /** 最新发布时间 */
  release_time?: string;
  /** 排序 */
  sort?: number;
  /** 标准说明 */
  standard_description?: string;
  /** 标准名称 */
  standard_name?: string;
  /** 版本号 */
  version?: string;
}

/** StandardField */
export interface APIStandardField {
  /** 应用标签 */
  apply_label?: string;
  /** 领域分类 */
  area_type?: string;
  /** 复制限定描述 */
  assignment_description?: string;
  /** 赋值限定表达式 */
  assignment_expression?: string;
  /** 数据类型 */
  data_type?: string;
  /** 描述 */
  description?: string;
  /** 字段类型 */
  field_type?: string;
  /** 创建时间 */
  gmt_created?: string;
  /** 修改时间 */
  gmt_modified?: string;
  /** 数据元ID */
  id?: number;
  ids?: string;
  /** 实施日期 */
  implementation_date?: string;
  /** 主键判断 */
  in_prm_key?: string;
  /** 删除标识：0、否 1、是 */
  is_deleted?: number;
  /** 是否索引 */
  is_index?: number;
  /** 是否必填 */
  is_not_null?: number;
  /** 长度 */
  length?: string;
  /** 值域编码 */
  mdm_rng_dctnry_cd?: string;
  /** 值域标记code还是name */
  mdm_rng_dctnry_flag?: string;
  /** 值域组名称 */
  mdm_rng_dctnry_group_name?: string;
  /** 值域目录id */
  mdm_rng_dctnry_id?: string;
  /** 引用值域 */
  mdm_rng_dctnry_list?: APIMdmRngDctnry[];
  /** 值域名称 */
  mdm_rng_dctnry_nm?: string;
  /** 值域组 */
  mdm_rng_dctnry_type?: string;
  /** 名称 */
  name?: string;
  /** 中文名 */
  name_cn?: string;
  /** 系统主键ID */
  pk_id?: number;
  /** 表示格式 */
  presentation_format?: string;
  /** 项目编码 */
  proj_code?: string;
  /** 质控类型 */
  quality_type?: string;
  /** 发布机构 */
  release_organization?: string;
  /** 发布时间 */
  release_time?: string;
  /** 备注 */
  remark?: string;
  /** 值域组别 */
  rng_group?: string;
  /** 标准编码 */
  standard_code?: string;
  /** 标准清单id */
  standard_dataset_id?: number;
  /** 数据元id */
  standard_field_id?: number;
  /** 标准全称 */
  standard_full_name?: string;
  /** 标准标识符 */
  standard_identifier?: string;
  /** 标准标签 */
  standard_label?: string;
  /** 标准级别 */
  standard_level?: string;
  /** 标准表id */
  standard_table_id?: number;
  /** 引用数量 */
  total?: number;
  /** 版本号 */
  version?: string;
}

/** StandardFieldDTO */
export interface APIStandardFieldDTO {
  /** 应用标签 */
  apply_label?: string;
  /** 领域分类 */
  area_type?: string;
  /** 复制限定描述 */
  assignment_description?: string;
  /** 赋值限定表达式 */
  assignment_expression?: string;
  /** 数据类型 */
  data_type?: string;
  /** 描述 */
  description?: string;
  /** 字段类型 */
  field_type?: string;
  /** 创建时间 */
  gmt_created?: string;
  /** 修改时间 */
  gmt_modified?: string;
  ids?: string;
  /** 实施日期 */
  implementation_date?: string;
  /** 主键判断 */
  in_prm_key?: string;
  /** 删除标识：0、否 1、是 */
  is_deleted?: number;
  /** 是否索引 */
  is_index?: number;
  /** 是否必填 */
  is_not_null?: number;
  /** 长度 */
  length?: string;
  /** 值域编码 */
  mdm_rng_dctnry_cd?: string;
  /** 值域标记code还是name */
  mdm_rng_dctnry_flag?: string;
  /** 值域组名称 */
  mdm_rng_dctnry_group_name?: string;
  /** 值域目录id */
  mdm_rng_dctnry_id?: string;
  mdm_rng_dctnry_list?: APIMdmRngDctnry[];
  /** 值域名称 */
  mdm_rng_dctnry_nm?: string;
  /** 值域组 */
  mdm_rng_dctnry_type?: string;
  /** 名称 */
  name?: string;
  /** 中文名 */
  name_cn?: string;
  /** 表示格式 */
  presentation_format?: string;
  /** 质控类型 */
  quality_type?: string;
  /** 发布机构 */
  release_organization?: string;
  /** 发布时间 */
  release_time?: string;
  /** 备注 */
  remark?: string;
  rng_group?: string;
  /** 标准编码 */
  standard_code?: string;
  /** 数据元id */
  standard_field_id?: number;
  /** 标准全称 */
  standard_full_name?: string;
  /** 标准标识符 */
  standard_identifier?: string;
  /** 标准标签 */
  standard_label?: string;
  /** 标准级别 */
  standard_level?: string;
  standard_table_ids?: string;
  total?: number;
  /** 版本号 */
  version?: string;
}

/** StandardFieldFlagParam */
export interface APIStandardFieldFlagParam {
  /** 值域组标记Code还是name */
  mdm_rng_dctnry_flag?: string;
  /** 数据元id */
  standard_field_id?: number;
}

/** StandardFieldGroupParam */
export interface APIStandardFieldGroupParam {
  /** 值域组名称 */
  mdm_rng_dctnry_group_name?: string;
  /** 值域组类别 */
  mdm_rng_dctnry_type?: string;
  standard_field_flag_param_list?: APIStandardFieldFlagParam[];
}

/** StandardFieldParam */
export interface APIStandardFieldParam {
  /** 标准字段列表 */
  standard_field_ids?: string[];
  /** 标准表id */
  standard_table_id?: string;
  /** 字典id */
  version?: string;
}

/** StandardTable */
export interface APIStandardTable {
  /** 数据来源 */
  data_source?: string;
  /** 表描述 */
  description?: string;
  /** 创建时间 */
  gmt_created?: string;
  /** 修改时间 */
  gmt_modified?: string;
  id?: number;
  /** 删除标识：0、否 1、是 */
  is_deleted?: number;
  /** 优先级 */
  level?: string;
  /** 表名 */
  name?: string;
  /** 表中文名 */
  name_cn?: string;
  /** 国标数据集 */
  national_standard_dataset?: string;
  pk_id?: number;
  /** 项目编码 */
  proj_code?: string;
  /** 发布时间 */
  release_time?: string;
  /** 标准清单id */
  standard_dataset_id?: number;
  /** 标准清单名称 */
  standard_dataset_name?: string;
  /** 标准表id */
  standard_table_id?: number;
  /** 类型 */
  type?: string;
  /** 版本号 */
  version?: string;
}

/**
 * StandardVO
 * 标准版本
 */
export interface APIStandardVO {
  /** 标准标签列表 */
  lable_list?: string[];
  /** 最近发布时间 */
  release_time?: string;
  /** 标准ID */
  standard_id?: number;
  /** 标准名称 */
  standard_name?: string;
  /** 状态：0、已发布  1、已弃用 */
  status?: number;
  /** 最近版本更新说明 */
  update_description?: string;
  /** 当前版本 */
  version?: string;
  /** 所有版本列表 */
  version_list?: string[];
}

/**
 * StdVersionVO
 * 标准版本列表参数
 */
export interface APIStdVersionVO {
  /** 标准ID */
  standard_id?: number;
  /** 标准名称 */
  standard_name?: string;
  version_list?: string[];
}

/** SysDictionary */
export interface APISysDictionary {
  /** 编号 */
  code?: string;
  /** 创建人 */
  create_name?: string;
  /** 描述 */
  description?: string;
  gmt_created?: string;
  gmt_modified?: string;
  id?: number;
  is_deleted?: number;
  /** 参数名称 */
  param?: string;
  /** 参数值 */
  param_value?: string;
  /** 父级id */
  parent_id?: number;
  pk_id?: number;
  /** 字典类型 */
  type?: string;
  /** 最后修改人 */
  update_name?: string;
}

/**
 * UploadDocVO
 * 文档上传返回参数
 */
export interface APIUploadDocVO {
  /** 名称 */
  name?: string;
  /** 预览下载地址 */
  svc_url?: string;
  /** 保存路径 */
  url?: string;
}

/** 下发标准参数 */
export interface APIType下发标准参数 {
  /** 标准ID */
  standard_id?: number;
  /** 标准版本号 */
  standard_version?: string;
}

/** 下发版本参数 */
export interface APIType下发版本参数 {
  /** 项目编码 */
  proj_code?: string;
  /** 下发标准 */
  standard_list?: APIType下发标准参数[];
}

/** 下载成功通知参数 */
export interface APIType下载成功通知参数 {
  /** 项目编码 */
  proj_code?: string;
  /** 下发标准 */
  standard_list?: APIType下发标准参数[];
}

/** 新增数据参数 */
export interface APIType新增数据参数 {
  /** 具体数据 */
  map?: Record<string, string>[];
  /** 主数据id */
  master_data_id?: string;
}

/** 标准标签移动参数 */
export interface APIType标准标签移动参数 {
  /** 移动的标签ID */
  moving_id?: number;
  /** 新位置下一个标签ID */
  next_id?: number;
  /** 新位置上一个标签ID */
  pre_id?: number;
}

/** 登录参数 */
export interface APIType登录参数 {
  /** Passport 登录 */
  code?: string;
  /** 密码 */
  password?: string;
  /** 用户名 */
  username?: string;
}

/** 项目保存参数 */
export interface APIType项目保存参数 {
  /** 项目ID(编辑时传) */
  id?: number;
  /** 项目编码 */
  proj_code?: string;
  /** 所属地区 */
  proj_district?: string;
  /** 项目名称 */
  proj_name?: string;
}

// ===================类型和方法分割线 by Artsmp========================

import { httpGet, httpPost } from "../request";

export default {
  /**
   * No description
   *
   * @tags 导出管理
   * @name ExportProjDdlUsingGet
   * @summary 建表SQL导出
   * @request GET:/api/export/standard/ddl
   */
  exportProjDdlUsingGet: httpGet<
    void,
    {
      /** 是否草稿 */
      is_draft?: number;
      /** 项目编码 */
      proj_code?: string;
      /** 标准ID */
      standard_id: number;
      /** 标准版本 */
      version?: string;
      /** 标准标签 */
      label?: string;
    }
  >("/api/export/standard/ddl"),
  /**
   * No description
   *
   * @tags 导出管理
   * @name ExportProjExcelUsingGet
   * @summary Excel导出
   * @request GET:/api/export/standard/excel
   */
  exportProjExcelUsingGet: httpGet<
    void,
    {
      /** 是否草稿 */
      is_draft?: number;
      /** 项目编码 */
      proj_code?: string;
      /** 标准ID */
      standard_id: number;
      /** 标准版本 */
      version?: string;
      /** 标准标签 */
      label?: string;
    }
  >("/api/export/standard/excel"),
  /**
   * No description
   *
   * @tags 导出管理
   * @name ExportProjViewUsingGet
   * @summary 视图SQL导出
   * @request GET:/api/export/standard/view
   */
  exportProjViewUsingGet: httpGet<
    void,
    {
      /** 是否草稿 */
      is_draft?: number;
      /** 项目编码 */
      proj_code?: string;
      /** 标准ID */
      standard_id: number;
      /** 标准版本 */
      version?: string;
      /** 标准标签 */
      label?: string;
    }
  >("/api/export/standard/view"),
  /**
   * No description
   *
   * @tags 导出管理
   * @name ExportProjWordUsingGet
   * @summary Word导出
   * @request GET:/api/export/standard/word
   */
  exportProjWordUsingGet: httpGet<
    void,
    {
      /** 是否草稿 */
      is_draft?: number;
      /** 项目编码 */
      proj_code?: string;
      /** 标准ID */
      standard_id: number;
      /** 标准版本 */
      version?: string;
      /** 标准标签 */
      label?: string;
    }
  >("/api/export/standard/word"),
  /**
   * No description
   *
   * @tags 主数据清单
   * @name AbandonmentOrReuseUsingGet
   * @summary 主数据弃用或复用
   * @request GET:/api/master-data/abandonmentOrReuse
   */
  abandonmentOrReuseUsingGet: httpGet<
    APIResult,
    {
      /** id */
      id: number;
    }
  >("/api/master-data/abandonmentOrReuse"),
  /**
   * No description
   *
   * @tags 主数据清单
   * @name DeleteUsingGet
   * @summary 主数据删除
   * @request GET:/api/master-data/delete
   */
  deleteUsingGet: httpGet<
    APIResult,
    {
      /** id */
      id: number;
    }
  >("/api/master-data/delete"),
  /**
   * No description
   *
   * @tags 主数据清单
   * @name DeleteJoinUsingGet
   * @summary 主数据取消关联
   * @request GET:/api/master-data/deleteJoin
   */
  deleteJoinUsingGet: httpGet<
    APIResult,
    {
      /** id */
      id: string;
    }
  >("/api/master-data/deleteJoin"),
  /**
   * No description
   *
   * @tags 主数据清单
   * @name HistoryListUsingGet
   * @summary 历史版本
   * @request GET:/api/master-data/historyList
   */
  historyListUsingGet: httpGet<
    APIResultMasterData,
    {
      /** 主数据id */
      id: string;
    }
  >("/api/master-data/historyList"),
  /**
   * No description
   *
   * @tags 主数据清单
   * @name ReleaseUsingPost
   * @summary 发布
   * @request POST:/api/master-data/release
   */
  releaseUsingPost: httpPost<APIResult, APIMasterDataReleaseParam>("/api/master-data/release"),
  /**
   * No description
   *
   * @tags 主数据清单
   * @name RestorationUsingGet
   * @summary 复原
   * @request GET:/api/master-data/restoration
   */
  restorationUsingGet: httpGet<
    APIResult,
    {
      /** id */
      id: string;
    }
  >("/api/master-data/restoration"),
  /**
   * No description
   *
   * @tags 主数据清单
   * @name SaveUsingPost
   * @summary 主数据保存--id有值就修改没有值就新增
   * @request POST:/api/master-data/save
   */
  saveUsingPost: httpPost<APIResult, APIMasterData>("/api/master-data/save"),
  /**
   * No description
   *
   * @tags 主数据清单
   * @name SelectMasterDataListUsingGet
   * @summary 查看列表
   * @request GET:/api/master-data/select
   */
  selectMasterDataListUsingGet: httpGet<
    APIResultMasterData,
    {
      /** 项目编码 */
      proj_code?: string;
      /** 查询参数 */
      search?: string;
      /** 字典id */
      sys_dictionary_id?: string;
    }
  >("/api/master-data/select"),
  /**
   * No description
   *
   * @tags 主数据清单
   * @name SelectMasterDataByIdUsingGet
   * @summary 查看主数据详情
   * @request GET:/api/master-data/selectByMasterDataId
   */
  selectMasterDataByIdUsingGet: httpGet<
    APIResultMasterData,
    {
      /** 主数据id */
      id: string;
    }
  >("/api/master-data/selectByMasterDataId"),
  /**
   * No description
   *
   * @tags 表头详情
   * @name DataDeleteUsingGet
   * @summary 数据编码删除
   * @request GET:/api/master-data-detail/dataDelete
   */
  dataDeleteUsingGet: httpGet<
    APIResult,
    {
      /** 主数据id */
      id?: string;
      /** 主数据id */
      master_data_id?: string;
    }
  >("/api/master-data-detail/dataDelete"),
  /**
   * No description
   *
   * @tags 表头详情
   * @name DeleteUsingGet1
   * @summary 表头管理删除
   * @request GET:/api/master-data-detail/delete
   */
  deleteUsingGet1: httpGet<
    APIResult,
    {
      /** id */
      id: number;
    }
  >("/api/master-data-detail/delete"),
  /**
   * No description
   *
   * @tags 表头详情
   * @name ExcelExportUsingPost
   * @summary 导出
   * @request POST:/api/master-data-detail/excelExport
   */
  excelExportUsingPost: httpPost<void, undefined>("/api/master-data-detail/excelExport"),
  /**
   * No description
   *
   * @tags 表头详情
   * @name ExcelImportUsingPost
   * @summary 导入
   * @request POST:/api/master-data-detail/importExcel
   */
  excelImportUsingPost: httpPost<
    APIResult,
    {
      /** 数据清单id */
      master_data_id?: string;
    }
  >("/api/master-data-detail/importExcel"),
  /**
   * No description
   *
   * @tags 表头详情
   * @name SaveUsingPost1
   * @summary 表头管理保存--id有值就修改没有值就新增
   * @request POST:/api/master-data-detail/save
   */
  saveUsingPost1: httpPost<APIResult, APIMasterDataDetail[]>("/api/master-data-detail/save"),
  /**
   * No description
   *
   * @tags 表头详情
   * @name SaveDataUsingPost
   * @summary 数据编码保存--id有值就修改没有值就新增
   * @request POST:/api/master-data-detail/saveData
   */
  saveDataUsingPost: httpPost<APIResult, APIType新增数据参数>("/api/master-data-detail/saveData"),
  /**
   * No description
   *
   * @tags 表头详情
   * @name SelectMasterDataDetailListUsingGet
   * @summary 数据编码查看表头
   * @request GET:/api/master-data-detail/select
   */
  selectMasterDataDetailListUsingGet: httpGet<
    APIResultMasterDataDetail,
    {
      /** 主数据id */
      id?: string;
    }
  >("/api/master-data-detail/select"),
  /**
   * No description
   *
   * @tags 表头详情
   * @name SelectDataListUsingGet
   * @summary 查看数据编码数据
   * @request GET:/api/master-data-detail/selectDataList
   */
  selectDataListUsingGet: httpGet<
    APIResult,
    {
      /** 主数据id */
      id?: string;
    }
  >("/api/master-data-detail/selectDataList"),
  /**
   * No description
   *
   * @tags 表头详情
   * @name SelectFieldTypeUsingGet
   * @summary 查看字段类型列表
   * @request GET:/api/master-data-detail/selectFieldType
   */
  selectFieldTypeUsingGet: httpGet<APIResult, undefined>("/api/master-data-detail/selectFieldType"),
  /**
   * No description
   *
   * @tags 基础值域
   * @name DeleteUsingGet2
   * @summary 基础值域删除
   * @request GET:/api/mdm-bss-rng/delete
   */
  deleteUsingGet2: httpGet<
    APIResult,
    {
      /** id */
      id: number;
    }
  >("/api/mdm-bss-rng/delete"),
  /**
   * No description
   *
   * @tags 基础值域
   * @name SaveUsingPost2
   * @summary 基础值域保存--id有值就修改没有值就新增
   * @request POST:/api/mdm-bss-rng/save
   */
  saveUsingPost2: httpPost<APIResult, APIMdmBssRng>("/api/mdm-bss-rng/save"),
  /**
   * No description
   *
   * @tags 基础值域
   * @name SelectRuleUsingGet
   * @summary 查询
   * @request GET:/api/mdm-bss-rng/select
   */
  selectRuleUsingGet: httpGet<
    APIResultMdmBssRng,
    {
      /** 项目编码 */
      proj_code?: string;
      /** 查询参数 */
      search?: string;
      /** 值域目录编码 */
      rng_dctnry_cd?: string;
    }
  >("/api/mdm-bss-rng/select"),
  /**
   * No description
   *
   * @tags 值域目录
   * @name DeleteUsingGet3
   * @summary 值域目录删除
   * @request GET:/api/mdm-rng-dctnry/delete
   */
  deleteUsingGet3: httpGet<
    APIResult,
    {
      /** ids */
      ids: number;
    }
  >("/api/mdm-rng-dctnry/delete"),
  /**
   * No description
   *
   * @tags 值域目录
   * @name ExcelExportUsingPost1
   * @summary 导出模板
   * @request POST:/api/mdm-rng-dctnry/excelExport
   */
  excelExportUsingPost1: httpPost<void, undefined>("/api/mdm-rng-dctnry/excelExport"),
  /**
   * No description
   *
   * @tags 值域目录
   * @name ExcelImportUsingPost1
   * @summary 导入
   * @request POST:/api/mdm-rng-dctnry/importExcel
   */
  excelImportUsingPost1: httpPost<
    APIResult,
    {
      /** file */
      file: File;
    }
  >("/api/mdm-rng-dctnry/importExcel"),
  /**
   * No description
   *
   * @tags 值域目录
   * @name SaveUsingPost3
   * @summary 值域目录保存--id有值就修改没有值就新增
   * @request POST:/api/mdm-rng-dctnry/save
   */
  saveUsingPost3: httpPost<APIResult, APIMdmRngDctnry>("/api/mdm-rng-dctnry/save"),
  /**
   * No description
   *
   * @tags 值域目录
   * @name SelectRuleUsingGet1
   * @summary 查看
   * @request GET:/api/mdm-rng-dctnry/select
   */
  selectRuleUsingGet1: httpGet<
    APIResultMdmRngDctnry,
    {
      /** 项目编码 */
      proj_code?: string;
      /** 查询参数 */
      search?: string;
      /** 字典id */
      sys_dictionary_id?: string;
    }
  >("/api/mdm-rng-dctnry/select"),
  /**
   * No description
   *
   * @tags 历史操作记录
   * @name PageUsingGet
   * @summary 操作日志列表
   * @request GET:/api/operate-record/list
   */
  pageUsingGet: httpGet<
    APIResultOperateRecord,
    {
      /** 标准清单id */
      standard_dataset_id?: string;
    }
  >("/api/operate-record/list"),
  /**
   * No description
   *
   * @tags 项目管理
   * @name DeleteUsingGet4
   * @summary 项目删除
   * @request GET:/api/project/delete
   */
  deleteUsingGet4: httpGet<
    APIResultBoolean,
    {
      /** 项目ID */
      proj_id: number;
    }
  >("/api/project/delete"),
  /**
   * No description
   *
   * @tags 项目管理
   * @name PageUsingGet1
   * @summary 项目列表
   * @request GET:/api/project/page
   */
  pageUsingGet1: httpGet<
    APIResultListProjectVO,
    {
      /** 项目编码或名称 */
      keyword?: string;
    }
  >("/api/project/page"),
  /**
   * No description
   *
   * @tags 项目管理
   * @name ReleaseUsingPost1
   * @summary 下发版本
   * @request POST:/api/project/release
   */
  releaseUsingPost1: httpPost<APIResultBoolean, APIType下发版本参数>("/api/project/release"),
  /**
   * No description
   *
   * @tags 项目管理
   * @name SaveUsingPost4
   * @summary 项目保存
   * @request POST:/api/project/save
   */
  saveUsingPost4: httpPost<APIResultBoolean, APIType项目保存参数>("/api/project/save"),
  /**
   * No description
   *
   * @tags 项目管理
   * @name GetStandardListUsingGet
   * @summary 下发标准列表
   * @request GET:/api/project/standard
   */
  getStandardListUsingGet: httpGet<APIResultListStdVersionVO, undefined>("/api/project/standard"),
  /**
   * No description
   *
   * @tags 项目标准管理
   * @name DeleteStandardUsingGet
   * @summary 删除标准
   * @request GET:/api/project-std/delete
   */
  deleteStandardUsingGet: httpGet<
    APIResultBoolean,
    {
      /** 标准ID */
      standard_id: number;
    }
  >("/api/project-std/delete"),
  /**
   * No description
   *
   * @tags 项目标准管理
   * @name DownloadUsingGet
   * @summary 手动下载标准
   * @request GET:/api/project-std/download
   */
  downloadUsingGet: httpGet<void, undefined>("/api/project-std/download"),
  /**
   * No description
   *
   * @tags 项目标准管理
   * @name NoticeUsingGet
   * @summary 手动上报通知
   * @request GET:/api/project-std/notice
   */
  noticeUsingGet: httpGet<void, undefined>("/api/project-std/notice"),
  /**
   * No description
   *
   * @tags 项目标准管理
   * @name GetStdPageUsingGet
   * @summary 项目标准版本
   * @request GET:/api/project-std/standard/page
   */
  getStdPageUsingGet: httpGet<
    APIResultListProjStandardVO,
    {
      /** 项目编码 */
      proj_code: string;
      /** 标准名称 */
      std_name?: string;
    }
  >("/api/project-std/standard/page"),
  /**
   * No description
   *
   * @tags 项目标准管理
   * @name UploadUsingGet
   * @summary 手动上传标准
   * @request GET:/api/project-std/upload
   */
  uploadUsingGet: httpGet<void, undefined>("/api/project-std/upload"),
  /**
   * No description
   *
   * @tags 项目标准管理
   * @name GetVersionPageUsingGet
   * @summary 标准版本
   * @request GET:/api/project-std/version/page
   */
  getVersionPageUsingGet: httpGet<
    APIResultListStandardVO,
    {
      /** 标准名称 */
      std_name?: string;
    }
  >("/api/project-std/version/page"),
  /**
   * No description
   *
   * @tags 版本管理
   * @name PageUsingGet2
   * @summary 历史版本列表
   * @request GET:/api/release-record/select
   */
  pageUsingGet2: httpGet<
    APIResultReleaseRecord,
    {
      /** 发布记录ID */
      id?: string;
      /** 项目编码 */
      proj_code?: string;
      /** 标准清单id */
      standard_dataset_id?: string;
      /** 版本号 */
      version?: string;
    }
  >("/api/release-record/select"),
  /**
   * No description
   *
   * @tags 标准知识库-文档关联数据
   * @name GetLinkedMasterDataDictionaryUsingGet
   * @summary 主数据字典
   * @request GET:/api/skb-doc-data/master-data/dictionary
   */
  getLinkedMasterDataDictionaryUsingGet: httpGet<
    APIResultListSkbLinkedMasterDataVO,
    {
      /** 页码 */
      page?: string;
      /** 每页记录数 */
      size?: string;
      /** 目录ID */
      catalog_id: string;
      /** 分类ID */
      group_id: number;
    }
  >("/api/skb-doc-data/master-data/dictionary"),
  /**
   * No description
   *
   * @tags 标准知识库-文档关联数据
   * @name GetLinkedMasterDataUsingGet
   * @summary 主数据
   * @request GET:/api/skb-doc-data/master-data/list
   */
  getLinkedMasterDataUsingGet: httpGet<APIResultListSkbLinkedRangeCatalogVO, undefined>(
    "/api/skb-doc-data/master-data/list",
  ),
  /**
   * No description
   *
   * @tags 标准知识库-文档关联数据
   * @name GetLinkedRangeDictionaryUsingGet
   * @summary 值域字典
   * @request GET:/api/skb-doc-data/range/dictionary
   */
  getLinkedRangeDictionaryUsingGet: httpGet<
    APIResultListSkbLinkedRangeDictionaryVO,
    {
      /** 页码 */
      page?: string;
      /** 每页记录数 */
      size?: string;
      /** 目录ID */
      catalog_id: string;
      /** 分类ID */
      group_id: number;
    }
  >("/api/skb-doc-data/range/dictionary"),
  /**
   * No description
   *
   * @tags 标准知识库-文档关联数据
   * @name GetLinkedRangeUsingGet
   * @summary 值域
   * @request GET:/api/skb-doc-data/range/list
   */
  getLinkedRangeUsingGet: httpGet<APIResultListSkbLinkedRangeCatalogVO, undefined>("/api/skb-doc-data/range/list"),
  /**
   * No description
   *
   * @tags 标准知识库-文档关联数据
   * @name GetLinkedStandardUsingGet
   * @summary 标准数据清单
   * @request GET:/api/skb-doc-data/standard/list
   */
  getLinkedStandardUsingGet: httpGet<APIResultListSkbLinkedStandardVO, undefined>("/api/skb-doc-data/standard/list"),
  /**
   * No description
   *
   * @tags 标准知识库-文档关联数据
   * @name GetLinkedStandardTableUsingGet
   * @summary 标准数据清单表
   * @request GET:/api/skb-doc-data/standard/table
   */
  getLinkedStandardTableUsingGet: httpGet<
    APIResultListSkbLinkedStandardTableVO,
    {
      /** 页码 */
      page?: string;
      /** 每页记录数 */
      size?: string;
      /** 标准ID */
      std_id: number;
      /** 版本号 */
      std_version: string;
      /** 分类目录 */
      std_type?: string;
    }
  >("/api/skb-doc-data/standard/table"),
  /**
   * No description
   *
   * @tags 标准知识库-标准文档目录
   * @name GetLinkedDataUsingGet
   * @summary 关联数据
   * @request GET:/api/skb-document/data
   */
  getLinkedDataUsingGet: httpGet<
    APIResultListSkbLinkedDataVO,
    {
      /** 文档ID */
      id: number;
    }
  >("/api/skb-document/data"),
  /**
   * No description
   *
   * @tags 标准知识库-标准文档目录
   * @name DeleteDocumentUsingGet
   * @summary 删除
   * @request GET:/api/skb-document/delete
   */
  deleteDocumentUsingGet: httpGet<
    APIResultBoolean,
    {
      /** 文档ID */
      id: number;
    }
  >("/api/skb-document/delete"),
  /**
   * No description
   *
   * @tags 标准知识库-标准文档目录
   * @name GetDocumentPageUsingGet
   * @summary 文档列表
   * @request GET:/api/skb-document/page
   */
  getDocumentPageUsingGet: httpGet<
    APIResultListSkbDocumentInfoVO,
    {
      /** 页码 */
      page?: string;
      /** 每页记录数 */
      size?: string;
      /** 分类ID */
      grp_label_id: number;
      /** 文件名称或标签 */
      keyword?: string;
    }
  >("/api/skb-document/page"),
  /**
   * No description
   *
   * @tags 标准知识库-标准文档目录
   * @name GetDocumentPageUsingPost
   * @summary 自定义标签设置
   * @request POST:/api/skb-document/page
   */
  getDocumentPageUsingPost: httpPost<APIResultBoolean, APISkbDocLabelSaveParam>("/api/skb-document/page"),
  /**
   * No description
   *
   * @tags 标准知识库-标准文档目录
   * @name RepealDocumentUsingGet
   * @summary 废止
   * @request GET:/api/skb-document/repeal
   */
  repealDocumentUsingGet: httpGet<
    APIResultBoolean,
    {
      /** 文档ID */
      id: number;
    }
  >("/api/skb-document/repeal"),
  /**
   * No description
   *
   * @tags 标准知识库-标准文档目录
   * @name SaveDocumentUsingPost
   * @summary 文档保存
   * @request POST:/api/skb-document/save
   */
  saveDocumentUsingPost: httpPost<APIResultBoolean, APISkbDocSaveParam>("/api/skb-document/save"),
  /**
   * No description
   *
   * @tags 标准知识库-标准文档目录
   * @name UploadFileUsingPost
   * @summary 文档上传
   * @request POST:/api/skb-document/upload
   */
  uploadFileUsingPost: httpPost<APIResultUploadDocVO, File>("/api/skb-document/upload"),
  /**
   * No description
   *
   * @tags 标准知识库-文档体系管理
   * @name GetCatalogListUsingGet
   * @summary 目录列表
   * @request GET:/api/skb-label/catalog/list
   */
  getCatalogListUsingGet: httpGet<APIResultListSkbCatalogVO, undefined>("/api/skb-label/catalog/list"),
  /**
   * No description
   *
   * @tags 标准知识库-文档体系管理
   * @name GetCustomLabelListUsingGet
   * @summary 搜索自定义标签
   * @request GET:/api/skb-label/custom/list
   */
  getCustomLabelListUsingGet: httpGet<
    APIResultListSkbCustomLabelVO,
    {
      /** 标签名称 */
      name?: string;
    }
  >("/api/skb-label/custom/list"),
  /**
   * No description
   *
   * @tags 标准知识库-文档体系管理
   * @name DeleteLabelUsingGet
   * @summary 删除
   * @request GET:/api/skb-label/delete
   */
  deleteLabelUsingGet: httpGet<
    APIResultBoolean,
    {
      /** 标签ID */
      id: number;
    }
  >("/api/skb-label/delete"),
  /**
   * No description
   *
   * @tags 标准知识库-文档体系管理
   * @name MoveLabelUsingPost
   * @summary 移动
   * @request POST:/api/skb-label/move
   */
  moveLabelUsingPost: httpPost<APIResultBoolean, APIType标准标签移动参数>("/api/skb-label/move"),
  /**
   * No description
   *
   * @tags 标准知识库-文档体系管理
   * @name SaveLabelUsingPost
   * @summary 保存
   * @request POST:/api/skb-label/save
   */
  saveLabelUsingPost: httpPost<APIResultBoolean, APISkbLabelSaveParam>("/api/skb-label/save"),
  /**
   * No description
   *
   * @tags 标准数据清单
   * @name DeleteUsingGet5
   * @summary 标准清单删除
   * @request GET:/api/standard-dataset/delete
   */
  deleteUsingGet5: httpGet<
    APIResult,
    {
      /** id */
      id: number;
    }
  >("/api/standard-dataset/delete"),
  /**
   * No description
   *
   * @tags 标准数据清单
   * @name ExcelImportUsingPost2
   * @summary 标准数据集导入
   * @request POST:/api/standard-dataset/importExcel
   */
  excelImportUsingPost2: httpPost<
    APIResult,
    {
      /** 数据清单id */
      standard_dataset_id?: string;
      /** 历史版本号 */
      version?: string;
    }
  >("/api/standard-dataset/importExcel"),
  /**
   * No description
   *
   * @tags 标准数据清单
   * @name PageUsingGet3
   * @summary 标准清单列表
   * @request GET:/api/standard-dataset/list
   */
  pageUsingGet3: httpGet<
    APIResultStandardDataset,
    {
      /** 项目编码 */
      proj_code?: string;
      /** 查询参数 */
      search?: string;
      /** 数据元id */
      standard_field_id?: string;
    }
  >("/api/standard-dataset/list"),
  /**
   * No description
   *
   * @tags 标准数据清单
   * @name SaveUsingPost5
   * @summary 标准清单保存--id有值就修改没有值就新增
   * @request POST:/api/standard-dataset/save
   */
  saveUsingPost5: httpPost<APIResult, APIStandardDataset>("/api/standard-dataset/save"),
  /**
   * No description
   *
   * @tags 数据元目录
   * @name CreateGroupUsingPost
   * @summary 创组
   * @request POST:/api/standard-field/createGroup
   */
  createGroupUsingPost: httpPost<APIResult, APIStandardFieldGroupParam>("/api/standard-field/createGroup"),
  /**
   * No description
   *
   * @tags 数据元目录
   * @name DeleteUsingGet6
   * @summary 数据元刪除
   * @request GET:/api/standard-field/delete
   */
  deleteUsingGet6: httpGet<
    APIResult,
    {
      /** id */
      id: number;
    }
  >("/api/standard-field/delete"),
  /**
   * No description
   *
   * @tags 数据元目录
   * @name DeleteReferenceUsingGet
   * @summary 标准表删除数据元引用
   * @request GET:/api/standard-field/deleteReference
   */
  deleteReferenceUsingGet: httpGet<
    APIResult,
    {
      /** id */
      id: number;
    }
  >("/api/standard-field/deleteReference"),
  /**
   * No description
   *
   * @tags 数据元目录
   * @name FieldMergeUsingGet
   * @summary 字段合并
   * @request GET:/api/standard-field/fieldMerge
   */
  fieldMergeUsingGet: httpGet<
    APIResult,
    {
      /** 新数据元id */
      new_id: number;
      /** 被合并的数据元id */
      old_id: number;
    }
  >("/api/standard-field/fieldMerge"),
  /**
   * No description
   *
   * @tags 数据元目录
   * @name FieldMergeAllUsingGet
   * @summary 一键字段合并
   * @request GET:/api/standard-field/fieldMergeAll
   */
  fieldMergeAllUsingGet: httpGet<APIResult, undefined>("/api/standard-field/fieldMergeAll"),
  /**
   * No description
   *
   * @tags 数据元目录
   * @name PageUsingGet4
   * @summary 标准表的数据元列表
   * @request GET:/api/standard-field/list
   */
  pageUsingGet4: httpGet<
    APIResult,
    {
      /** 项目编码 */
      proj_code?: string;
      /** 标准表id */
      standard_table_id?: string;
      /** 数据元名称 */
      name?: string;
      /** 版本号 */
      version?: string;
      /** 字典id */
      sys_dictionary_id?: string;
    }
  >("/api/standard-field/list"),
  /**
   * No description
   *
   * @tags 数据元目录
   * @name ReferenceListUsingPost
   * @summary 标准表引用数据元
   * @request POST:/api/standard-field/referenceList
   */
  referenceListUsingPost: httpPost<APIResult, APIStandardFieldParam>("/api/standard-field/referenceList"),
  /**
   * No description
   *
   * @tags 数据元目录
   * @name SaveUsingPost6
   * @summary 标准表保存数据元--id有值就修改没有值就新增
   * @request POST:/api/standard-field/save
   */
  saveUsingPost6: httpPost<APIResult, APIStandardField>("/api/standard-field/save"),
  /**
   * No description
   *
   * @tags 数据元目录
   * @name SelectGroupUsingGet
   * @summary 查询值域组名
   * @request GET:/api/standard-field/selectGroup
   */
  selectGroupUsingGet: httpGet<
    APIResult,
    {
      /** name */
      name: string;
    }
  >("/api/standard-field/selectGroup"),
  /**
   * No description
   *
   * @tags 数据元目录
   * @name StandardFieldListUsingGet
   * @summary 数据元列表
   * @request GET:/api/standard-field/standardFieldList
   */
  standardFieldListUsingGet: httpGet<
    APIResult,
    {
      /** 项目编码 */
      proj_code?: string;
      /** 标准表id */
      standard_table_id?: string;
      /** 数据元名称 */
      name?: string;
      /** 版本号 */
      version?: string;
      /** 字典id */
      sys_dictionary_id?: string;
    }
  >("/api/standard-field/standardFieldList"),
  /**
   * No description
   *
   * @tags 数据元目录
   * @name UpdateFullUsingPost
   * @summary 全局修改数据元
   * @request POST:/api/standard-field/updateFull
   */
  updateFullUsingPost: httpPost<APIResult, APIStandardFieldDTO>("/api/standard-field/updateFull"),
  /**
   * No description
   *
   * @tags 详情
   * @name DeleteUsingGet7
   * @summary 标准表删除
   * @request GET:/api/standard-table/delete
   */
  deleteUsingGet7: httpGet<
    APIResult,
    {
      /** id */
      id: number;
    }
  >("/api/standard-table/delete"),
  /**
   * No description
   *
   * @tags 详情
   * @name ListUsingGet
   * @summary 标准表列表
   * @request GET:/api/standard-table/list
   */
  listUsingGet: httpGet<
    APIResult,
    {
      /** 项目编码 */
      proj_code?: string;
      /** 查询参数 */
      search?: string;
      /** 版本号 */
      version?: string;
      /** 标准清单id */
      standard_dataset_id?: string;
      /** 数据元id */
      standard_field_id?: string;
    }
  >("/api/standard-table/list"),
  /**
   * No description
   *
   * @tags 详情
   * @name PageUsingGet5
   * @summary 标准表列表-所有版本
   * @request GET:/api/standard-table/page
   */
  pageUsingGet5: httpGet<
    APIResult,
    {
      /** 项目编码 */
      proj_code?: string;
      /** 查询参数 */
      search?: string;
      /** 版本号 */
      version?: string;
      /** 标准清单id */
      standard_dataset_id?: string;
    }
  >("/api/standard-table/page"),
  /**
   * No description
   *
   * @tags 详情
   * @name ReleaseUsingPost2
   * @summary 发布
   * @request POST:/api/standard-table/release
   */
  releaseUsingPost2: httpPost<APIResult, APIReleaseParam>("/api/standard-table/release"),
  /**
   * No description
   *
   * @tags 详情
   * @name SaveUsingPost7
   * @summary 标准表保存--id有值就修改没有值就新增
   * @request POST:/api/standard-table/save
   */
  saveUsingPost7: httpPost<APIResult, APIStandardTable>("/api/standard-table/save"),
  /**
   * No description
   *
   * @tags 字典
   * @name ListUsingGet1
   * @summary 字典列表
   * @request GET:/api/sys-dictionary/list
   */
  listUsingGet1: httpGet<
    APIResult,
    {
      /** 父级ID */
      parent_id?: string;
      /** 字典类型 */
      type?: string;
      /** 参数名称 */
      param?: string;
      /** 参数值 */
      param_value?: string;
    }
  >("/api/sys-dictionary/list"),
  /**
   * No description
   *
   * @tags 字典
   * @name SaveUsingPost8
   * @summary 字典保存--id有值就修改没有值就新增
   * @request POST:/api/sys-dictionary/save
   */
  saveUsingPost8: httpPost<APIResult, APISysDictionary>("/api/sys-dictionary/save"),
  /**
   * No description
   *
   * @tags 用户管理
   * @name GetLoginUserInfoUsingGet
   * @summary 用户信息
   * @request GET:/api/login/user
   */
  getLoginUserInfoUsingGet: httpGet<APIResultLoginUserInfoVO, undefined>("/api/login/user"),
  /**
   * No description
   *
   * @tags 值域接口调用
   * @name SelectMdmBssRngListUsingGet
   * @summary 查看基础值域列表
   * @request GET:/innerapi/standard/selectMdmBssRngList
   */
  selectMdmBssRngListUsingGet: httpGet<
    APIMdmBssRng[],
    {
      /** 值域说明 */
      description?: string;
      /** 创建时间 */
      gmtCreated?: string;
      /** 修改时间 */
      gmtModified?: string;
      id?: number;
      /** 删除标识：0、否 1、是 */
      isDeleted?: number;
      /** 父级id */
      parentId?: string;
      pkId?: number;
      /** 项目编码 */
      projCode?: string;
      /** 值域目录来源文件名称 */
      rngCd?: string;
      /** 自定义内部统一值域目录编码，业务表对应值域的标准编码 */
      rngDctnryCd?: string;
      /** 值域目录名称 */
      rngDctnryNm?: string;
      /** 值域目录来源文件编码 */
      rngNm?: string;
    }
  >("/innerapi/standard/selectMdmBssRngList"),
  /**
   * No description
   *
   * @tags 值域接口调用
   * @name SelectMdmRngDctnryListUsingGet
   * @summary 查看值域目录列表
   * @request GET:/innerapi/standard/selectMdmRngDctnryList
   */
  selectMdmRngDctnryListUsingGet: httpGet<
    APIMdmRngDctnry[],
    {
      /** 代码标识 */
      codeIdentification?: string;
      /** 国家编码 */
      countryCode?: string;
      /** 值域目录所属类型代码，1-基础值域目录；2-主数据值域目录 */
      dctnryTp?: string;
      /** 全称 */
      fullName?: string;
      /** 创建时间 */
      gmtCreated?: string;
      /** 修改时间 */
      gmtModified?: string;
      id?: number;
      /** 实施时间 */
      implementationDate?: string;
      /** 是否ai匹配 */
      isAi?: boolean;
      /** 删除标识：0、否 1、是 */
      isDeleted?: number;
      /** 值域目录来源文件名称 */
      orgnlStdrdNm?: string;
      /** 值域目录来源文件编码 */
      orgnlStdrdNo?: string;
      pkId?: number;
      /** 项目编码 */
      projCode?: string;
      /** 标准类别名称 */
      rangeCategoryName?: string;
      /** 发布单位 */
      releaseOrganization?: string;
      /** 发布时间 */
      releaseTime?: string;
      /** 领域分类 */
      rngAreaType?: string;
      /** 自定义内部统一值域目录编码，业务表对应值域的标准编码 */
      rngDctnryCd?: string;
      /** 值域目录名称 */
      rngDctnryNm?: string;
      /** 级别 */
      rngLevel?: string;
      /** 机构分类 */
      rngOrganization?: string;
      /** 标准目录编码 */
      standardDctnryCode?: string;
      /** 标准目录名称 */
      standardDctnryName?: string;
      /** 标准目录类型 */
      standardDctnryType?: string;
      /** 标准分类 */
      standardType?: string;
      /** 类型 */
      type?: string;
    }
  >("/innerapi/standard/selectMdmRngDctnryList"),
  /**
   * No description
   *
   * @tags 值域接口调用
   * @name SelectMdmRngRulListUsingGet
   * @summary 查看基础值域列表
   * @request GET:/innerapi/standard/selectMdmRngRulList
   */
  selectMdmRngRulListUsingGet: httpGet<
    APIMdmBssRng[],
    {
      crtTm?: string;
      fildCd?: string;
      fildNm?: string;
      invldFlg?: string;
      mdlTpCd?: string;
      mdlTpNm?: string;
      rngDctnryCd?: string;
      rngDctnryNm?: string;
      tblNm?: string;
      tblNmChns?: string;
      updTm?: string;
    }
  >("/innerapi/standard/selectMdmRngRulList"),
  /**
   * No description
   *
   * @tags 用户管理
   * @name LoginUsingPost
   * @summary 登录
   * @request POST:/login
   */
  loginUsingPost: httpPost<APIResultString, APIType登录参数>("/login"),
  /**
   * No description
   *
   * @tags 用户管理
   * @name GetCodeUsingGet
   * @summary 获取CODE
   * @request GET:/openapi/login/getcode
   */
  getCodeUsingGet: httpGet<
    APIResult,
    {
      /** code */
      code: string;
    }
  >("/openapi/login/getcode"),
  /**
   * No description
   *
   * @tags 项目上报管理
   * @name SetDeleteNoticeUsingGet
   * @summary 删除项目标准通知(项目端调用)
   * @request GET:/openapi/center/delete/notice
   */
  setDeleteNoticeUsingGet: httpGet<
    APIResult,
    {
      /** proj_code */
      proj_code: string;
      /** std_id */
      std_id: number;
    }
  >("/openapi/center/delete/notice"),
  /**
   * No description
   *
   * @tags 项目上报管理
   * @name GetDownloadStdUsingGet
   * @summary 下载项目版本(项目端调用)
   * @request GET:/openapi/center/download
   */
  getDownloadStdUsingGet: httpGet<
    APIResult,
    {
      /** proj_code */
      proj_code: string;
    }
  >("/openapi/center/download"),
  /**
   * No description
   *
   * @tags 项目上报管理
   * @name SetDownloadNoticeUsingPost
   * @summary 下载成功通知(项目端调用)
   * @request POST:/openapi/center/download/notice
   */
  setDownloadNoticeUsingPost: httpPost<APIResult, APIType下载成功通知参数>("/openapi/center/download/notice"),
  /**
   * No description
   *
   * @tags 项目上报管理
   * @name SaveUploadStdUsingPost
   * @summary 上传项目版本(项目端调用)
   * @request POST:/openapi/center/upload
   */
  saveUploadStdUsingPost: httpPost<APIResult, APIReleaseStandardDTO>("/openapi/center/upload"),
};
