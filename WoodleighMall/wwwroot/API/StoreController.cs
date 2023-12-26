using Elasticsearch.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Nest;
using OrchardCore;
using OrchardCore.ContentManagement;
using StackExchange.Profiling.Internal;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace WoodleighMall.wwwroot.API
{
    [Route("api/graphql")]
    [ApiKey]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private IOrchardHelper _orchard;
        public StoreController(IOrchardHelper orchard)
        {
            _orchard = orchard;
        }
        public async Task<IActionResult> Get()
        {
            var storeList = await _orchard.QueryListItemsAsync("4zfd9ghrn7zxpsg61c6m20zn43");
            storeList = storeList.OrderBy(x => x.DisplayText);
            var storeInfo = new List<StoreDetails>();
            foreach (var item in storeList)
            {
                var isNew = false;
                if (item.ContentItem.Content.Store.IsNew != null)
                { isNew = item.ContentItem.Content.Store.IsNew.Value; }

                var level = string.Empty;
                if (item.ContentItem.Content.Store.Level != null)
                { level = item.ContentItem.Content.Store.Level.Text; }

                var description = string.Empty;
                if (item.ContentItem.Content.Store.Description != null)
                { description = item.ContentItem.Content.Store.Description.Text; }

                var storeDetails = new StoreDetails
                {
                    ContactNumber = item.ContentItem.Content.Store.ContactNumber.Text,
                    CreatedUtc = item.CreatedUtc.Value.ToString(),
                    IsAcceptVouchers = item.ContentItem.Content.Store.CPMVoucherAccepted.Value,
                    IsNew = isNew,
                    Level = level,
                    Location = item.ContentItem.Content.Store.Address.Text,
                    ModifiedUtc = item.ModifiedUtc.Value.ToString(),
                    PublishedUtc = item.PublishedUtc.Value.ToString(),
                    DisplayText = item.ContentItem.Content.TitlePart.Title.Value,
                    Render = description
                    //Categories = await CategoriesList(item.ContentItem.Content.Store.Category.TermContentItemIds, item)

                };
                storeInfo.Add(storeDetails);
            }
            return Ok(storeInfo);
        }

        private async Task<string> CategoriesList(dynamic Ids, OrchardCore.ContentManagement.ContentItem Model)
        {
            string list = string.Empty;
            foreach (string termId in Ids)
            {
                var term = await _orchard.GetTaxonomyTermAsync((string)Model.ContentItem.Content.Store.Category.TaxonomyContentItemId, termId);
                if (term != null)
                    list = list + ',' + term;
            }
            return list.Trim(',');
        }
        private class StoreDetails
        {
            //public string Categories { get; set; }
            public string ContactNumber { get; set; }
            public string CreatedUtc { get; set; }
            public bool IsAcceptVouchers { get; set; }
            public bool IsNew { get; set; }
            public string Level { get; set; }
            public string Location { get; set; }
            public string ModifiedUtc { get; set; }
            public string PublishedUtc { get; set; }
            public string Render { get; set; }
            public string DisplayText { get; set; }
        }
    }
}
