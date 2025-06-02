```mermaid
classDiagram
    class AdminKeuangan {
        -String userId
        -String email
        -String password
        -String nama
        -String jabatan
        +requestPasswordReset()
        +inputVerificationCode(code: String)
        +setNewPassword(newPassword: String)
        +getEmail() String
    }

    class ResetPasswordController {
        -UserRepository userRepo
        -VerificationCodeService codeService
        -EmailService emailService
        -PasswordService passwordService
        +processResetRequest(email: String) Boolean
        +validateVerificationCode(email: String, code: String) Boolean
        +updatePassword(email: String, newPassword: String) Boolean
        +sendVerificationEmail(email: String) Boolean
    }

    class UserRepository {
        -Database connection
        +findUserByEmail(email: String) User
        +validateUserExists(email: String) Boolean
        +updatePassword(userId: String, hashedPassword: String) Boolean
        +getUserById(userId: String) User
        +saveUser(user: User) Boolean
    }

    class VerificationCodeService {
        -Map<String, VerificationCode> tempStorage
        -Integer codeLength
        -Integer expiryMinutes
        +generateUniqueCode() String
        +storeCode(email: String, code: String) Boolean
        +validateCode(email: String, inputCode: String) Boolean
        +isCodeExpired(email: String) Boolean
        +removeCode(email: String) Boolean
    }

    class EmailService {
        -String smtpServer
        -String smtpPort
        -String username
        -String password
        +sendVerificationEmail(toEmail: String, code: String) Boolean
        +formatEmailMessage(code: String) String
        +handleSendingFailure(exception: Exception) void
        +logEmailActivity(email: String, status: String) void
    }

    class PasswordService {
        -EncryptionService encryptionService
        -PasswordValidator validator
        +hashPassword(password: String) String
        +validatePasswordStrength(password: String) Boolean
        +generateSalt() String
        +encryptPassword(password: String, salt: String) String
    }

    class User {
        -String userId
        -String email
        -String hashedPassword
        -String nama
        -String jabatan
        -DateTime createdAt
        -DateTime updatedAt
        +getUserId() String
        +getEmail() String
        +setPassword(hashedPassword: String) void
        +getNama() String
        +getJabatan() String
    }

    class VerificationCode {
        -String code
        -String email
        -DateTime createdAt
        -DateTime expiryTime
        +getCode() String
        +isExpired() Boolean
        +getEmail() String
    }

    class Database {
        <<interface>>
        +connect() Connection
        +executeQuery(query: String) ResultSet
        +executeUpdate(query: String) Integer
        +close() void
    }

    class EncryptionService {
        +hashWithSalt(password: String, salt: String) String
        +generateSalt() String
        +verifyPassword(password: String, hash: String) Boolean
    }

    class PasswordValidator {
        -Integer minLength
        -Boolean requireSpecialChar
        -Boolean requireNumber
        +isValidPassword(password: String) Boolean
        +getPasswordRequirements() String
    }

    class EmailTemplate {
        -String templatePath
        +getResetPasswordTemplate() String
        +formatTemplate(code: String, userName: String) String
    }

    class LogService {
        +logInfo(message: String) void
        +logError(message: String, exception: Exception) void
        +logEmailActivity(email: String, status: String) void
    }

    %% Relationships
    AdminKeuangan ||--o{ ResetPasswordController : requests
    ResetPasswordController ||--|| UserRepository : uses
    ResetPasswordController ||--|| VerificationCodeService : uses
    ResetPasswordController ||--|| EmailService : uses
    ResetPasswordController ||--|| PasswordService : uses
    
    UserRepository ||--|| Database : connects to
    UserRepository ||--o{ User : manages
    
    VerificationCodeService ||--o{ VerificationCode : creates
    
    EmailService ||--|| EmailTemplate : uses
    EmailService ||--|| LogService : uses
    
    PasswordService ||--|| EncryptionService : uses
    PasswordService ||--|| PasswordValidator : uses

    %% Notes
    note for AdminKeuangan "Actor yang melakukan\nreset password"
    note for ResetPasswordController "Main controller untuk\nmengelola proses reset"
    note for VerificationCodeService "Kode disimpan sementara\ndengan expiry time"
```
