
using System.Collections.Generic;
using System.Data;
using Napoleon.NewsWebsite.Model;

namespace Napoleon.NewsWebsite.IDAL
{
    public interface INewsUploadFileDao
    {

        /// <summary>
        ///  查询数据
        /// </summary>
        /// Author  :Napoleon
        /// Created :2015-06-06 02:02:28
        DataTable GetNewsUploadFileTable(string id);

        /// <summary>
        ///  根据ID数组查询数据
        /// </summary>
        /// Author  :Napoleon
        /// Created :2015-06-13 10:54:06
        List<NewsUploadFile> GetNewsUploadFilesByIds(string id);

        /// <summary>
        ///  新增数据
        /// </summary>
        /// Author  :Napoleon
        /// Created :2015-06-06 02:02:28
        int InsertNewsUploadFile(NewsUploadFile model);

        /// <summary>
        ///  更新数据
        /// </summary>
        /// Author  :Napoleon
        /// Created :2015-06-06 02:02:28
        int UpdateNewsUploadFile(NewsUploadFile model);

        /// <summary>
        ///  删除数据
        /// </summary>
        /// Author  :Napoleon
        /// Created :2015-06-06 02:02:28
        int DeleteNewsUploadFile(string id);

    }
}