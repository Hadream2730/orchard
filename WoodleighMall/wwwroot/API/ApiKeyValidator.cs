namespace WoodleighMall.wwwroot.API
{
    public class ApiKeyValidator : IApiKeyValidator
    {
        public bool IsValid(string apiKey)
        {
            // Implement logic for validating the API key.
            if (apiKey== "4zfd9ghrn7zxpsg61c6m20zn43")
                return true ;
            return false;
        }
    }

    public interface IApiKeyValidator
    {
        bool IsValid(string apiKey);
    }
}
