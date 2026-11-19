from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = "Interview Reflection API"
    app_version: str = "0.1.0"
    api_prefix: str = "/api/v1"
    app_env: str = "development"
    database_url: str = (
        "postgresql+asyncpg://postgres:postgres@localhost:5432/interview_reflection"
    )
    cors_origins: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]


@lru_cache
def get_settings() -> Settings:
    return Settings()
